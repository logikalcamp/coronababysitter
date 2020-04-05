//const {GPhotos} = require('upload-gphotos');
//const fs = require('fs');
//var path = require('path');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'sitterseekercloud',
    api_key: '128644798248273',
    api_secret: 'ElA61Avn46r7AKPMl4V7b7all_8'
});

class ImageService {
    constructor() {

    }

    uploadImageToGooglePhotos(albumName, filePath) {
        return new Promise((resolve,reject) => {
            cloudinary.uploader.upload(filePath, {resource_type:"auto"}, (error,result) => {
                if(error) reject(error)

                resolve({rawUrl: result.url, id:result.public_id});
            });
        });
        // const gphotos = new GPhotos();
    
        // var username = 'appsitterseeker@gmail.com';
        // var password = 'sitterseeker2020';

        // try {

        
        //     await gphotos.signin({
        //         username,
        //         password,
        //     });
            
        //     const album = await gphotos.searchAlbum({ title: albumName });

        //     const photo = await gphotos.upload({
        //         stream: fs.createReadStream(filePath),
        //         size: (await fs.promises.stat(filePath)).size,
        //         filename: path.basename(filePath),
        //     });

        //     await album.append(photo);

        //     return photo;
        // }
        // catch (error)  {
        //     return undefined;
        // }
    }
}

module.exports.ImageService = ImageService;