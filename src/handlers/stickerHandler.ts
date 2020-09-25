import { Client, decryptMedia, Message } from '@open-wa/wa-automate';
import { MessageTypes } from '@open-wa/wa-automate/dist/api/model/message';
import { readFile, writeFile } from 'fs';

import { botConfig } from '../config';
import { videoToWebP } from '../helpers/videoToWebp';

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

            let outputFile = 'output';

            const result = videoToWebP(filename, outputFile);

            result.then(response => {
                readFile(`${outputFile}.webp`, (err, data) => {
                    if (err) {
                        console.log(err);
                        client.reply(message.chatId, "Internal error occured. Sorry :(", message.id);
                        return;
                    }

                    let base64Webp = `${data.toString('base64')}`;
                    client.sendRawWebpAsSticker(message.from, base64Webp)
                        .then((val) => {
                            console.log(`Gif to sicker conversion successful! ${val}`);
                        }).catch((err) => {
                            console.log(`Failed to send sticker!`);
                            console.log(err);
                            client.reply(message.chatId, "Cannot be converted. Sorry :(", message.id);
                        });
                });
            }).catch(err => {
                console.log(err);
                client.reply(message.chatId, "Internal error occured. Sorry :(", message.id);
            });
        });

    } else {

        client.reply(message.chatId, "You need to tag image or gif !", message.id);

    }
}

export { stickerHandler };