"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botConfig = exports.serverOption = void 0;
const serverOption = {
    headless: true,
    cacheEnabled: false,
    useChrome: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ],
    browserRevision: '737027'
};
exports.serverOption = serverOption;
const botConfig = {
    name: 'Andy',
    commandPrefix: '!',
    uaOverride: 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
};
exports.botConfig = botConfig;
//# sourceMappingURL=config.js.map