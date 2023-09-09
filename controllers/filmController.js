const mongoose = require('mongoose');
const { cloudinary, uploads } = require('../config/cloudinary');
const Film = require('../models/Film');
const fs = require('fs');

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
    const data = { image: req.file.path };

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
            rating: req.body.rating,
            image: result.secure_url,
            image_id: result.public_id,
            director: req.body.director,
            cast_names: req.body.cast_names,
        })

        await newFilm.save();

        // fs.unlinkSync(data);

        res.status(201).json({ message: "Film Added!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteFilm = async (req, res) => {
    const {id} = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "No film with such ID found" })
        }
    
        const film = await Film.findById(id);
    
        await film.deleteOne(film);
        
        await cloudinary.uploader.destroy(film.trailer_id, { resource_type: 'video' }, 
            (result) => console.log(result)
        );
    
        await cloudinary.api.delete_resources(
            [film.image_id, film.cast_image_id1, film.cast_image_id2, film.cast_image_id3,
            film.cast_image_id4, film.cast_image_id5],
            (result) => console.log(result)
        );
    
    
        const reply = `Film '${film.title}' deleted`;
    
        res.json(reply);
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

        // const film = Film.findById(id);

        // await cloudinary.uploader.destroy(film.trailer_id, { resource_type: 'video' },
        //     (result) => console.log(result)
        // );

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(data.trailer, 
                { resource_type: 'video', folder: 'film-cloud' }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                }
            );
        });

        const addedTrailer = await Film.findByIdAndUpdate(
            id, { trailer: result.secure_url, trailer_id: result.public_id, _id: id }, 
            { new: true }
        );

        await addedTrailer.save();

        // fs.unlinkSync(data);

        res.status(200).json({ message: `'${addedTrailer.title}' trailer inserted!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCastImage1 = async (req, res) => {   
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const film = await Film.findById(id);

        film.cast_image1 = result.secure_url;
        film.cast_image_id1 = result.public_id;

        const addedCastImage1 = await film.save();
        
        res.status(201).json({ 
            message: `first cast image for ${addedCastImage1.title} added` 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCastImage2 = async (req, res) => {   
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const film = await Film.findById(id);

        film.cast_image2 = result.secure_url;
        film.cast_image_id2 = result.public_id;

        const addedCastImage2 = await film.save();
        
        res.status(201).json({ 
            message: `second cast image for ${addedCastImage2.title} added` 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCastImage3 = async (req, res) => {   
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const film = await Film.findById(id);

        film.cast_image3 = result.secure_url;
        film.cast_image_id3 = result.public_id;

        const addedCastImage3 = await film.save();
        
        res.status(201).json({ 
            message: `third cast image for ${addedCastImage3.title} added` 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCastImage4 = async (req, res) => {   
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const film = await Film.findById(id);

        film.cast_image4 = result.secure_url;
        film.cast_image_id4 = result.public_id;

        const addedCastImage4 = await film.save();
        
        res.status(201).json({ 
            message: `fourth cast image for ${addedCastImage4.title} added` 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addCastImage5 = async (req, res) => {   
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({ message: "No film with such ID found" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const film = await Film.findById(id);

        film.cast_image5 = result.secure_url;
        film.cast_image_id5 = result.public_id;

        const addedCastImage5 = await film.save();
        
        res.status(201).json({ 
            message: `fifth cast image for ${addedCastImage5.title} added` 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    getFilm, getFilmById, createFilm, addTrailer, deleteFilm,
    addCastImage1, addCastImage2, addCastImage3, addCastImage4, addCastImage5
}