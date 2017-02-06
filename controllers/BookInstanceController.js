var BookInstance = require('../models/BookInstance');

exports.bookInstanceList = function (req, res, next) {
    BookInstance.find()
        .populate('book')
        .exec(function (err, list_bookinstances) {
            if (err)
                return next(err);
            res.render('bookinstance_list', {
                title: 'Book Instance List',
                bookinstance_list: list_bookinstances
            });
        });
};
exports.bookInstanceDetail = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance detail' + req.params.id);
}
exports.bookInstanceCreateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
}
exports.bookInstanceCreatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
}
exports.bookInstanceDeleteGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
}
exports.bookInstanceDeletePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
}
exports.bookInstanceUpdateGet = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
}
exports.bookInstanceUpdatePost = function (req, res, next) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
}