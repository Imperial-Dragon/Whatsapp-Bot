"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToGiffy = void 0;
const request_1 = require("request");
function uploadToGiffy(postData) {
    var opt = {
        url: `https://upload.giphy.com/v1/gifs?api_key=${postData.api_key}`,
        formData: postData,
        json: true
    };
    const p = new Promise((resolve, reject) => {
        request_1.post(opt, function (e, resp, body) {
            if (e || resp.statusCode !== 200) {
                reject(`Unable to upload to Giffy !, ${e}`);
            }
            else {
                resolve(`https://media.giphy.com/media/${body.data.id}/giphy.gif`);
            }
        });
    });
    return p;
}
exports.uploadToGiffy = uploadToGiffy;
//# sourceMappingURL=uploadToGiffy.js.map