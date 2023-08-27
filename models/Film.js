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
    trailer: String,
    director: String,
    cast_names: [{type: String, default: '' }],
    cast_images: { data: Buffer, type: String},
    public_id: String
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Film', filmSchema);