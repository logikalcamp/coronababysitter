import axios from 'axios';
import {BASE_URL} from '../constants';

const uploadPhoto = async (photoFile, photoType) => {
    const formData = new FormData();
    formData.append("photoFile", photoFile);

    try {
        var response = await axios({
            method: 'post',
            url: BASE_URL+'/api/uploadphoto',
            data: formData,
            headers: {'Content-Type':'multipart-formdata'}
        })

        return response.data.photo.rawUrl;
    } 
    catch (error) {
        return undefined
    }
}

export default uploadPhoto;