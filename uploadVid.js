const { cloudinary } = require('./config/cloudinary');

const file = './public/video/Green Book.MP4';

async function run() {
    try {
        const result = await cloudinary.uploader.upload(file, { resource_type: 'video' });
        console.log(`Result: ${result.secure_url}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = run;