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
const videoToWebp_1 = require("../helpers/videoToWebp");
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
                let outputFile = 'output';
                const result = videoToWebp_1.videoToWebP(filename, outputFile);
                result.then(response => {
                    fs_1.readFile(`${outputFile}.webp`, (err, data) => {
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
                            client.reply(message.chatId, "Gif Cannot be converted. Sorry :(", message.id);
                        });
                    });
                }).catch(err => {
                    console.log(err);
                    client.reply(message.chatId, "Internal error occured. Sorry :(", message.id);
                });
            });
        }
        else {
            client.reply(message.chatId, "You need to tag image or gif !", message.id);
        }
    });
}
exports.stickerHandler = stickerHandler;
//# sourceMappingURL=stickerHandler.js.map