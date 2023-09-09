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
    .delete(filmController.deleteFilm)
;

router.route('/cast/:id')
    .post(upload.single('cast_image1'), filmController.addCastImage1)
;

router.route('/cast1/:id')
    .post(upload.single('cast_image2'), filmController.addCastImage2)
;

router.route('/cast2/:id')
    .post(upload.single('cast_image3'), filmController.addCastImage3)
;
router.route('/cast3/:id')
    .post(upload.single('cast_image4'), filmController.addCastImage4)
;
router.route('/cast4/:id')
    .post(upload.single('cast_image5'), filmController.addCastImage5)
;

module.exports = router;