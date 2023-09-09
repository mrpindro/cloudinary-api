const { cloudinary } = require('./config/cloudinary');

// const file = './public/video/Green Book.MP4';

// async function run() {
//     try {
//         const result = await cloudinary.uploader.upload(file, { resource_type: 'video' });
//         console.log(`Result: ${result.secure_url}`)
//     } catch (error) {
//         console.log(error);
//     }
// }

const images = [
    './public/image/Mahershala Ali.jpeg',
    './public/image/Viggo Mortesen.jpeg',
    './public/image/Linda Cardellini.jpeg',
]

async function run() {
    try {
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image)
            console.log(result.secure_url);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = run;