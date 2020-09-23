"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wa_automate_1 = require("@open-wa/wa-automate");
const config_1 = require("./config");
const handler_1 = require("./handler");
function startServer(client) {
    console.log('Server is running ...');
    client.onStateChanged((state) => {
        console.log('[Client State]', state);
        if (state === 'CONFLICT')
            client.forceRefocus();
    });
    client.onMessage((message) => {
        if (message.isGroupMsg) {
            handler_1.handle(client, message);
        }
    });
    client.onAddedToGroup((chat) => {
        console.log(chat.groupMetadata.id);
    });
}
wa_automate_1.create(config_1.botConfig.name, config_1.serverOption)
    .then(startServer)
    .catch((err) => { console.log(err); });
//# sourceMappingURL=app.js.map