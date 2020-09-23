"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const parseCommand_1 = require("./helpers/parseCommand");
const helpHandler_1 = require("./handlers/helpHandler");
const stickerHandler_1 = require("./handlers/stickerHandler");
const infoHandler_1 = require("./handlers/infoHandler");
const unlistedHandler_1 = require("./handlers/unlistedHandler");
function handle(client, message) {
    if (message.type === "chat") {
        const command = parseCommand_1.parseCommand(message.body);
        switch (command) {
            case "help" /* HELP */:
                helpHandler_1.helpHandler(client, message);
                break;
            case "sticker" /* STICKER */:
                stickerHandler_1.stickerHandler(client, message);
                break;
            case "info" /* INFO */:
                infoHandler_1.infoHandler(client, message);
                break;
            case "" /* UNLISTED */:
                unlistedHandler_1.unlistedHandler(client, message);
        }
    }
}
exports.handle = handle;
//# sourceMappingURL=handler.js.map