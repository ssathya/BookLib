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
    res.send('NOT IMPLEMENTED: Book create GET');
}
exports.bookCreatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Book create POST');
}
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