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
    res.send('NOT IMPLEMENTED: Author create GET');
}
exports.authorCreatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author create POST');
}
exports.authorDeleteGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author delete GET');
}
exports.authorDeletePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author delete POST');
}
exports.authorUpdateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author update GET');
}
exports.authorUpdatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Author update POST');
}