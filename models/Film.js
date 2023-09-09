const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    duration: { type: String, required: true },
    action: { type: String, default: ''},
    crime: { type: String, default: ''},
    documentary: { type: String, default: ''},
    drama: { type: String, default: ''},
    biography: { type: String, default: ''},
    scifi: { type: String, default: ''},
    fantasy: { type: String, default: ''},
    adventure: { type: String, default: ''},
    horror: { type: String, default: ''},
    nsfw: { type: String, default: ''},
    animation: { type: String, default: ''},
    western: { type: String, default: ''},
    romance: { type: String, default: ''},
    description: String,
    billboard: {type: String, default: 'no'},
    rating: String,
    image: String,
    image_id: String, 
    trailer: String,
    trailer_id: String,
    director: String,
    cast_names: [{type: String, default: '' }],
    cast_image1: String,
    cast_image_id1: String,
    cast_image2: String,
    cast_image_id2: String,
    cast_image3: String,
    cast_image_id3: String,
    cast_image4: String,
    cast_image_id4: String,
    cast_image5: String,
    cast_image_id5: String,
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Film', filmSchema);