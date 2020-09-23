"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stickerHandler = void 0;
const wa_automate_1 = require("@open-wa/wa-automate");
const message_1 = require("@open-wa/wa-automate/dist/api/model/message");
const fs_1 = require("fs");
const config_1 = require("../config");
const uploadToGiffy_1 = require("../helpers/uploadToGiffy");
function stickerHandler(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let quotedMsg = message.quotedMsg;
        if (quotedMsg == null) {
            client.reply(message.chatId, "You did not tag a image or gif !", message.id);
        }
        else if (quotedMsg.type === message_1.MessageTypes.IMAGE) {
            const mediaData = yield wa_automate_1.decryptMedia(quotedMsg);
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
            client.sendImageAsSticker(message.from, imageBase64).then(val => {
                console.log("Image sticker conversion sucessful !");
            }).catch((err) => {
                console.log(err);
            });
        }
        else if (quotedMsg.type === message_1.MessageTypes.VIDEO && quotedMsg.isGif) {
            const mediaData = yield wa_automate_1.decryptMedia(quotedMsg, config_1.botConfig.uaOverride);
            const filename = 'temp.mp4';
            fs_1.writeFile(filename, mediaData, (err) => {
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
                let postData = {
                    api_key: api_key,
                    file: {
                        value: fs_1.createReadStream(filename),
                        options: {
                            filename: filename,
                            contentType: 'image/gif'
                        }
                    }
                };
                uploadToGiffy_1.uploadToGiffy(postData).then((gifUrl) => __awaiter(this, void 0, void 0, function* () {
                    client.reply(message.chatId, "Hold up .. It may take some time ...", message.id);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        client.sendGiphyAsSticker(message.from, gifUrl).then((val) => {
                            console.log("Gif to sticker conversion successful !");
                        }).catch(err => {
                            console.log(err);
                        });
                    }), 15000);
                })).catch((err) => __awaiter(this, void 0, void 0, function* () {
                    console.log(err);
                    yield client.reply(message.from, "Internal error occured. Sorry :(", message.id);
                }));
            });
        }
        else {
            client.reply(message.chatId, "You need to tag image or gif !", message.id);
        }
    });
}
exports.stickerHandler = stickerHandler;
//# sourceMappingURL=stickerHandler.js.map