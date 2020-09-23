"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlistedHandler = void 0;
function unlistedHandler(client, message) {
    client.reply(message.chatId, "*Unlisted Command* use _!help_ to get the list of valid commands!", message.id);
}
exports.unlistedHandler = unlistedHandler;
//# sourceMappingURL=unlistedHandler.js.map