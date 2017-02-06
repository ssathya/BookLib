var Genre = require('../models/Genre');
var Book = require('../models/Book');
var async = require('async');

exports.genreList = function (req, res, next) {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function (err, genres) {
            if (err) { return next(err); }
            res.render('genre_list', { title: 'Genre List', list_genre: genres });
        });
};

/**
 * genreDetail
 * 
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
exports.genreDetail = function (req, res, next) {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },
        genreBooks: function (callback) {
            Book.find({ 'genre': req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre, genre_books: results.genreBooks
        });
    });
};
exports.genreCreateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre create GET');
}
exports.genreCreatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre create POST');
}
exports.genreDeleteGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
}
exports.genreDeletePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
}
exports.genreUpdateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update GET');
}
exports.genreUpdatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Genre update POST');
}