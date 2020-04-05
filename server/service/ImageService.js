
var cloudinary = require('cloudinary').v2;
const sharp = require('sharp');

cloudinary.config({
    cloud_name: 'sitterseekercloud',
    api_key: '128644798248273',
    api_secret: 'ElA61Avn46r7AKPMl4V7b7all_8'
});

class ImageService {
    constructor() {

    }

    uploadImageToCloud(filePath) {
        return new Promise((resolve,reject) => {
            sharp(filePath).resize(150).toFile(filePath + ".jpeg", (error,info) => {
                cloudinary.uploader.upload(filePath + ".jpeg", {resource_type:"auto"}, (error,result) => {
                    if(error) reject(error)
    
                    resolve({rawUrl: result.url, id:result.public_id});
                });
            })
        });
    }
}

module.exports.ImageService = ImageService;