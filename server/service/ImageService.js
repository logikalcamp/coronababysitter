const {GPhotos} = require('upload-gphotos');
const fs = require('fs');
var path = require('path');


class ImageService {
    constructor() {

    }

    async uploadImageToGooglePhotos(albumName, filePath) {
        const gphotos = new GPhotos();
    
        var username = 'appsitterseeker@gmail.com';
        var password = 'sitterseeker2020';

        try {

        
            await gphotos.signin({
                username,
                password,
            });
            
            const album = await gphotos.searchAlbum({ title: albumName });

            const photo = await gphotos.upload({
                stream: fs.createReadStream(filePath),
                size: (await fs.promises.stat(filePath)).size,
                filename: path.basename(filePath),
            });

            await album.append(photo);

            return photo;
        }
        catch (error)  {
            return undefined;
        }
    }
}

module.exports.ImageService = ImageService;