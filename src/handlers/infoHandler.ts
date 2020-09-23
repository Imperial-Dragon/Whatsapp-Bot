import { Client, Message } from '@open-wa/wa-automate';

function infoHandler(client: Client, message: Message) {
    console.info(`Info Handler Called with message ${message}!`);
}

export { infoHandler };