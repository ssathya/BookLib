var BookInstance = require('../models/BookInstance');
var Book = require('../models/Book');

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
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookInstance) {
            if (err) { return next(err); }
            res.render('bookinstance_detail', {
                title: 'Book:',
                bookinstance: bookInstance
            });
        });
};
exports.bookInstanceCreateGet = function (req, res, next) {
    Book.find({}, 'title')
        .sort([['title', 'ascending']])
        .exec(function (err, books) {
            if (err) { return next(err); }
            res.render('bookinstance_form', {
                title: 'Create BookInstance',
                book_list: books
            });
        });
};
exports.bookInstanceCreatePost = function (req, res, next) {
    req.sanitize('book').trim();
    req.sanitize('book').escape();
    req.sanitize('imprint').trim();
    req.sanitize('imprint').escape();
    req.sanitize('status').trim();
    req.sanitize('status').escape();
    req.sanitize('dueDate').toDate();

    req.checkBody('book', "Book cannot be empty").notEmpty();
    req.checkBody('imprint', 'Imprint cannot be empty').notEmpty();
    req.checkBody('dueDate', 'Invaild date').optional({ checkFalsy: true }).isDate();

    var bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        dueDate: req.body.dueDate
    });
    var errors = req.validationErrors();
    if (errors) {
        Book.find({}, 'title')
            .sort([['title', 'ascending']])
            .exec(function (err, books) {
                if (err) { return next(err); }
                res.render('bookinstance_form', {
                    title: 'Create BookInstance',
                    book_list: books,
                    selected_book: bookInstance.book._id,
                    errors: errors,
                    bookInstance: bookInstance
                });
            });
    }
    else {
        bookInstance.save(function (err) {
            if (err) { return next(err); }
            res.redirect(bookInstance.url);
        });
    };
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