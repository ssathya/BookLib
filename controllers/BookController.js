var Book = require('../models/Book');
var Author = require('../models/Author');
var Genre = require('../models/Genre');
var BookInstance = require('../models/BookInstance');
var async = require('async');

exports.index = function (req, res, next) {
    async.parallel({
        book_count: function (callback) {
            Book.count(callback);
        },
        book_instance_count: function (callback) {
            BookInstance.count(callback);
        },
        book_instance_available_count: function (callback) {
            BookInstance.count({ status: 'Available' }, callback);
        },
        author_count: function (callback) {
            Author.count(callback);
        },
        genre_count: function (callback) {
            Genre.count(callback);
        },
    }, function (err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

exports.bookList = function (req, res, next) {
    Book.find({}, 'title author')
        .sort([['title', 'ascending']])
        .populate('author')
        .exec(function (err, list_books) {
            if (err) {
                return next(err);
            }
            console.log(list_books);
            res.render('book_list', { title: 'Book List', book_list: list_books });
        });
};
exports.bookDetail = function (req, res, next) {
    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        bookInstance: function (callback) {
            BookInstance.find({ 'book': req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('book_detail', {
            title: 'Title',
            book: results.book,
            book_instances: results.bookInstance
        });
    });
};
exports.bookCreateGet = function (req, res, next) {
    //Get all authors and genres which we can use for adding a book
    async.parallel({
        authors: function (callback) {
            Author.find(callback);
        },
        genres: function (callback) {
            Genre.find(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('book_form', {
            title: 'Create Book',
            authors: results.authors,
            genres: results.genres
        });
    });
};

exports.bookCreatePost = function (req, res, next) {
    req.sanitize('title').escape();
    req.sanitize('author').escape();
    req.sanitize('summary').escape();
    req.sanitize('isbn').escape();
    req.sanitize('genre').escape();

    req.sanitize('title').trim();
    req.sanitize('author').trim();
    req.sanitize('summary').trim();
    req.sanitize('isbn').trim();

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('summary', 'Summary is required').notEmpty();
    req.checkBody('isbn', 'ISBN is required').notEmpty();

    var book = new Book({
        author: req.body.author,
        title: req.body.title,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre.split(",")
    });
    var errors = req.validationErrors();
    if (errors) {
        async.parallel({
            authors: function (callback) {
                Author.find(callback);
            },
            genres: function (callback) {
                Genre.find(callback);
            },
        }, function (err, results) {
            if (err) { return next(err); }
            for (i = 0; i < results.genres.length; i++) {
                if (book.genre.indexOf(results.genres[i]._id) > -1) {
                    results.genres[i].checked = 'true';
                }
            };
            res.render('book_form', {
                title: 'Create Book',
                authors: results.authors,
                genres: results.genres,
                book: book,
                errors: errors
            });
        });
    }
    else {
        book.save(function (err) {
            if (err) { return next(err); }
            res.redirect(book.url);
        });
    }
};
exports.bookDeleteGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete GET');
}
exports.bookDeletePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book delete POST');
}
exports.bookUpdateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update GET');
}
exports.bookUpdatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book update POST');
}