import { Client, decryptMedia, Message } from '@open-wa/wa-automate';
import { MessageTypes } from '@open-wa/wa-automate/dist/api/model/message';
import { createReadStream, writeFile } from 'fs';

import { botConfig } from '../config';
import { uploadToGiffy } from '../helpers/uploadToGiffy';
import { GiffyPostData } from '../models/giffyPostData';

async function stickerHandler(client: Client, message: Message) {
    let quotedMsg = message.quotedMsg;

    if (quotedMsg == null) {

        client.reply(message.chatId, "You did not tag a image or gif !", message.id);

    } else if (quotedMsg.type === MessageTypes.IMAGE) {

        const mediaData = await decryptMedia(quotedMsg);
        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;

        client.sendImageAsSticker(message.from, imageBase64).then(val => {
            console.log("Image sticker conversion sucessful !");
        }).catch((err) => {
            console.log(err);
        });

    } else if (quotedMsg.type === MessageTypes.VIDEO && quotedMsg.isGif) {

        const mediaData = await decryptMedia(quotedMsg, botConfig.uaOverride);
        const filename = 'temp.mp4';
        writeFile(filename, mediaData, (err) => {
            if (err) {
                console.log(err);
                client.reply(message.chatId, "Internal error occured. Sorry :(", message.id);
                return;
            }

            let api_key = (process.env.GIFFY_API_KEY) ? process.env.GIFFY_API_KEY : '';

            if (api_key === '') {
                console.log("Error ! Could not found Giffy API Key, set GIFFY_API_KEY environment variable and restart application");
                return;
            }

            let postData: GiffyPostData = {
                api_key: api_key,
                file: {
                    value: createReadStream(filename),
                    options: {
                        filename: filename,
                        contentType: 'image/gif'
                    }
                }
            }

            uploadToGiffy(postData).then(async (gifUrl) => {
                client.reply(message.chatId, "Hold up .. It may take some time ...", message.id);
                setTimeout(async () => {
                    client.sendGiphyAsSticker(message.from, gifUrl).then((val) => {
                        console.log("Gif to sticker conversion successful !");
                    }).catch(err => {
                        console.log(err);
                    });
                }, 15000);
            }).catch(async (err) => {
                console.log(err);
                await client.reply(message.from, "Internal error occured. Sorry :(", message.id);
            });
        });

    } else {

        client.reply(message.chatId, "You need to tag image or gif !", message.id);

    }
}

export { stickerHandler };