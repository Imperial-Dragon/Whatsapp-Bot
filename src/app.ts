import { create, Client, Message, Chat } from '@open-wa/wa-automate';

import { serverOption, botConfig } from './config'
import { handle } from './handler';

function startServer(client: Client) {

    console.log('Server is running ...');

    client.onStateChanged((state: string) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT') client.forceRefocus()
    });

    client.onMessage((message: Message) => {
        if (message.isGroupMsg) {
            handle(client, message);
        }
    });

    client.onAddedToGroup((chat: Chat) => {
        console.log(chat.groupMetadata.id);
    });
}

create(botConfig.name, serverOption)
    .then(startServer)
    .catch((err) => { console.log(err) });