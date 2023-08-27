const express = require('express');
const filmController = require('../controllers/filmController');
const upload = require('../config/multerUpload');
const router = express.Router();

router.route('/')
    .get(filmController.getFilm)
    .post(upload.single('image'), filmController.createFilm)
;

router.route('/:id')
    .get(filmController.getFilmById)
    .post(upload.single('trailer'), filmController.addTrailer)
//     .delete(filmController.deleteTrailer)
// ;

// router.route('/cast/:id')
//     .post(upload.array('cast_images'), filmController.addCastImages)
// ;

module.exports = router;