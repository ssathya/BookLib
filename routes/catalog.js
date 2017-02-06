var express = require('express');
var router = express.Router();

var authorController = require('../controllers/AuthorController');
var bookController = require('../controllers/BookController');
var bookInstanceController = require('../controllers/BookInstanceController');
var genreController = require('../controllers/GenreController');

router.get('/', bookController.index);
router.get('/book/create', bookController.bookCreateGet);
router.post('/book/create', bookController.bookCreatePost);
router.get('/book/:id/delete', bookController.bookDeleteGet);
router.post('/book/:id/delete', bookController.bookDeletePost);
router.get('/book/:id/update', bookController.bookUpdateGet);
router.post('/book/:id/update', bookController.bookUpdatePost);
router.get('/book/:id', bookController.bookDetail);
router.get('/books', bookController.bookList);

router.get('/author/create', authorController.authorCreateGet);
router.post('/author/create', authorController.authorCreatePost);
router.get('/author/:id/delete', authorController.authorDeleteGet);
router.post('/author/:id/delete', authorController.authorDeletePost);
router.get('/author/:id/update', authorController.authorUpdateGet);
router.post('/author/:id/update', authorController.authorUpdatePost);
router.get('/author/:id', authorController.authorDetail);
router.get('/authors', authorController.authorList);

router.get('/genre/create', genreController.genreCreateGet);
router.post('/genre/create', genreController.genreCreatePost);
router.get('/genre/:id/delete', genreController.genreDeleteGet);
router.post('/genre/:id/delete', genreController.genreDeletePost);
router.get('/genre/:id/update', genreController.genreUpdateGet);
router.post('/genre/:id/update', genreController.genreUpdatePost);
router.get('/genre/:id', genreController.genreDetail);
router.get('/genres', genreController.genreList);

router.get('/bookInstance/create', bookInstanceController.bookInstanceCreateGet);
router.post('/bookInstance/create', bookInstanceController.bookInstanceCreatePost);
router.get('/bookInstance/:id/delete', bookInstanceController.bookInstanceDeleteGet);
router.post('/bookInstance/:id/delete', bookInstanceController.bookInstanceDeletePost);
router.get('/bookInstance/:id/update', bookInstanceController.bookInstanceUpdateGet);
router.post('/bookInstance/:id/update', bookInstanceController.bookInstanceUpdatePost);
router.get('/bookInstance/:id', bookInstanceController.bookInstanceDetail);
router.get('/bookInstances', bookInstanceController.bookInstanceList);

module.exports = router;
