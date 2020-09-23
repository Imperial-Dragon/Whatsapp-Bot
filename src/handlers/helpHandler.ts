import { Client, Message } from '@open-wa/wa-automate';

function helpHandler(client: Client, message: Message) {
    console.info(`Help Handler Called with message ${message}!`);
}

export { helpHandler };