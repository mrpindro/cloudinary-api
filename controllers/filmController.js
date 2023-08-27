const mongoose = require('mongoose');
const { cloudinary } = require('../config/cloudinary');
const Film = require('../models/Film');

const getFilm = async (req, res) => {
    try {
        const films = await Film.find();

        res.json(films);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getFilmById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No film with such ID found" });
        }

        const film = await Film.findById(id);

        res.json(film);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const createFilm = async (req, res) => {
    const data = {image: req.file.path}

    try {
        const result = await cloudinary.uploader.upload(data.image);

        const newFilm = new Film({
            title: req.body.title,
            year: req.body.year,
            duration: req.body.duration,
            action: req.body.action,
            crime: req.body.crime,
            documentary: req.body.documentary,
            drama: req.body.drama,
            biography: req.body.biography,
            scifi: req.body.scifi,
            fantasy: req.body.fantasy,
            adventure: req.body.adventure,
            horror: req.body.horror,
            nsfw: req.body.nsfw,
            animation: req.body.animation,
            western: req.body.western,
            romance: req.body.romance,
            description: req.body.description,
            billboard: req.body.billboard,
            rating: req.bodyrating,
            image: result.secure_url,
            director: req.body.director,
            cast_names: req.body.cast_names,
        })

        await newFilm.save();

        res.status(201).json({ message: "Film Added!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addTrailer = async (req, res) => {
    const { id } = req.params;
    const data = { trailer: req.file.path }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(data.trailer, { resource_type: 'video' });

        const addedTrailer = await Film.findByIdAndUpdate(
            id, { trailer: result.secure_url, _id: id }, { new: true }
        );

        await addedTrailer.save();

        res.status(200).json({ message: "Trailer Inserted!" });
    } catch (error) {
        res.status.json({ message: error.message });
    }
}

module.exports = { getFilm, getFilmById, createFilm, addTrailer }