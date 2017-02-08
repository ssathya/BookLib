var Author = require('../models/Author');
var Book = require('../models/Book');
var async = require('async');
/**
 * authorList
 * 
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
exports.authorList = function (req, res, next) {
    Author.find()
        .sort([['lastName', 'ascending']])
        .exec(function (err, listAuthors) {
            if (err) { return next(err); }
            res.render('author_list', { title: 'Author List', author_list: listAuthors });
        });
};
exports.authorDetail = function (req, res, next) {
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback);
        },
        authorBooks: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('author_detail',
            {
                title: 'Author Detail',
                author: results.author,
                author_books: results.authorBooks
            });
    });
};
exports.authorCreateGet = function (req, res, next) {
    res.render('author_form', { title: 'Create Author' });
}
exports.authorCreatePost = function (req, res, next) {
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('dateOfBirth', 'Invalid date').optional({ checkFalsy: true }).isDate();
    req.checkBody('dateOfDeath', 'Invalid date').optional({ checkFalsy: true }).isDate();

    req.sanitize('firstName').escape();
    req.sanitize('lastName').escape();
    req.sanitize('firstName').trim();
    req.sanitize('lastName').trim();
    req.sanitize('dateOfBirth').toDate();
    req.sanitize('dateOfDeath').toDate();

    var errors = req.validationErrors();

    var author = new Author(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath
        });
    if (errors) {
        res.render('author_form', {
            title: 'Create Author',
            author: author,
            errors: errors
        });
        return;
    }
    author.save(function (err) {
        if (err) { return next(err); }
        res.redirect(author.url);
    });
};
exports.authorDeleteGet = function (req, res, next) {
    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id).exec(callback);
        },
        author_books: function (callback) {
            Book.find({ 'author': req.params.id })
                .sort([['title', 'ascending']])
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('author_delete', {
            title: 'Delete Author',
            author: results.author,
            author_books: results.author_books
        });
    });
};

exports.authorDeletePost = function (req, res, next) {

    req.checkBody('authorid', 'Author id must exist').notEmpty();
    var errors = req.validationErrors();

    async.parallel({
        author: function (callback) {
            Author.findById(req.body.authorid)
                .exec(callback);
        },
        author_books: function (callback) {
            Book.find({ 'author': req.body.authorid }, 'title summary')
                .sort([['title', 'ascending']])
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.author_books.length > 0) {
            res.render('author_delete', {
                title: 'Delete Author',
                author: results.author,
                author_books: results.author_books
            });
        }
        else {
            Author.findByIdAndRemove(req.body.authorid, function (err) {
                if (err) { return next(err); }
                res.redirect('/catalog/authors');
            })
        }
    }
    );
}
exports.authorUpdateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author update GET');
}
exports.authorUpdatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author update POST');
}