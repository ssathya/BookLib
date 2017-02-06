var Author = require('../models/Author');

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
    res.send('NOT IMPLEMENTED: Author detail' + req.params.id);
}
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