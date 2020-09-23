import { post } from 'request';

import { GiffyPostData } from '../models/giffyPostData'

function uploadToGiffy(postData: GiffyPostData) {
    var opt = {
        url: `https://upload.giphy.com/v1/gifs?api_key=${postData.api_key}`,
        formData: postData,
        json: true
    }

    const p = new Promise((resolve: (gifUrl: string) => void, reject) => {

        post(opt, function (e, resp, body) {
            if (e || resp.statusCode !== 200) {
                reject(`Unable to upload to Giffy !, ${e}`);
            } else {
                resolve(`https://media.giphy.com/media/${body.data.id}/giphy.gif`);
            }
        });
    })
    return p
}

export { uploadToGiffy };