import { Commands } from '../commands'
import { botConfig } from '../config'

function parseCommand(commandStr: string): Commands {
    if (commandStr.length == 0 || commandStr[0] !== botConfig.commandPrefix)
        return Commands.INVALID;

    commandStr = commandStr.substring(botConfig.commandPrefix.length);
    commandStr = commandStr.trim();

    console.log(`Recieved command ${commandStr}`);

    switch (commandStr) {
        case "help":
            return Commands.HELP;
        case "sticker":
            return Commands.STICKER;
        case "info":
            return Commands.INFO;
        default:
            return Commands.UNLISTED;
    }
}

export { parseCommand };