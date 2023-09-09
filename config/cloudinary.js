const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url,
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}


// const uploadToCloudinary = (path, folder) => {
//     return cloudinary.uploader.upload(path, {
//         folder
//     })
//         .then((data) => {
//             return {url: data.url, public_id: data.public_id}
//         }).catch((error) => {
//             console.log(error);
//         })
//     ;
// }

// const removeFromCloudinary = async (public_id) => {
//     await cloudinary.uploader.destroy(public_id, (error, result) => {
//         console.log(result, error)
//     })
// }

module.exports = { cloudinary, uploads};