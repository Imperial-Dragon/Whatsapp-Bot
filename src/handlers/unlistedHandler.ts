import { Client, Message } from '@open-wa/wa-automate';

function unlistedHandler(client: Client, message: Message) {
    client.reply(message.chatId, "*Unlisted Command* use _!help_ to get the list of valid commands!", message.id);
}

export { unlistedHandler };