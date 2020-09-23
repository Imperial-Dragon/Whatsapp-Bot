"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = void 0;
const config_1 = require("../config");
function parseCommand(commandStr) {
    if (commandStr.length == 0 || commandStr[0] !== config_1.botConfig.commandPrefix)
        return "invalid" /* INVALID */;
    commandStr = commandStr.substring(config_1.botConfig.commandPrefix.length);
    commandStr = commandStr.trim();
    console.log(`Recieved command ${commandStr}`);
    switch (commandStr) {
        case "help":
            return "help" /* HELP */;
        case "sticker":
            return "sticker" /* STICKER */;
        case "info":
            return "info" /* INFO */;
        default:
            return "" /* UNLISTED */;
    }
}
exports.parseCommand = parseCommand;
//# sourceMappingURL=parseCommand.js.map