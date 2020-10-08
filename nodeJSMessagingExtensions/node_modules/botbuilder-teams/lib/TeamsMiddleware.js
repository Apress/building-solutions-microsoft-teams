"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StripBotAtMentions {
    constructor() {
        this.botbuilder = (session, next) => {
            let message = session.message;
            if (message) {
                let botMri = message.address.bot.id.toLowerCase();
                let botAtMentions = message.entities && message.entities.filter((entity) => (entity.type === "mention") && (entity.mentioned.id.toLowerCase() === botMri));
                if (botAtMentions && botAtMentions.length) {
                    message.textWithBotMentions = message.text;
                    message.text = botAtMentions.reduce((previousText, entity) => {
                        return previousText.replace(entity.text, "").trim();
                    }, message.text);
                }
            }
            next();
        };
    }
}
exports.StripBotAtMentions = StripBotAtMentions;
