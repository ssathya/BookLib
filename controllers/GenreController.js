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
    res.render('genre_form', { title: 'Create Genre' });
}
exports.genreCreatePost = function (req, res, next) {

    //Trim and escape the name
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //Check for empty string
    req.checkBody('name', 'Genre name required').notEmpty();

    

    //create a genre object
    var genre = new Genre({ name: req.body.name });
    //Run validation
    var errors = req.validationErrors();
    if (errors) {
        res.render('genre_form', {
            title: 'Create Genre',
            genre: genre,
            errors: errors
        });
        return;
    }
    Genre.findOne({ 'name': req.body.name })
        .exec(function (err, foundGenre) {
            console.log("Found genre" + foundGenre);
            if (err) { return next(err); }
            if (foundGenre)//Genre already exists
                res.redirect(foundGenre.url);
            else {
                genre.save(function (err) {
                    if (err) { return next(err); }
                    res.redirect(genre.url);
                });
            }
        });
};

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