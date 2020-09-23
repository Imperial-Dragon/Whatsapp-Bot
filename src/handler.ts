import { Client, Message } from '@open-wa/wa-automate';

import { parseCommand } from './helpers/parseCommand';
import { Commands } from './commands';
import { helpHandler } from './handlers/helpHandler';
import { stickerHandler } from './handlers/stickerHandler';
import { infoHandler } from './handlers/infoHandler';
import { unlistedHandler } from './handlers/unlistedHandler';

function handle(client: Client, message: Message) {
    if (message.type === "chat") {
        const command = parseCommand(message.body);

        switch (command) {
            case Commands.HELP:
                helpHandler(client, message);
                break;
            case Commands.STICKER:
                stickerHandler(client, message);
                break;
            case Commands.INFO:
                infoHandler(client, message);
                break;
            case Commands.UNLISTED:
                unlistedHandler(client, message);
        }
    }
}

export { handle };