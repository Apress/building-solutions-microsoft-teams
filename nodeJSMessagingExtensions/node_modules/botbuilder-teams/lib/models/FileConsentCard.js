"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const o365ConnectorCard_1 = require("./o365ConnectorCard");
class FileConsentCard {
    constructor(session) {
        this.session = session;
        this.data = {
            contentType: "application/vnd.microsoft.teams.card.file.consent",
            content: {}
        };
    }
    name(name) {
        this.data.name = name;
        return this;
    }
    description(description, ...args) {
        if (description) {
            this.data.content.description = o365ConnectorCard_1.fmtText(this.session, description, args);
        }
        else {
            delete this.data.content.description;
        }
        return this;
    }
    sizeInBytes(sizeInBytes) {
        if (sizeInBytes < 0) {
            throw new Error("sizeInBytes must be greater than or equal to 0.");
        }
        this.data.content.sizeInBytes = sizeInBytes;
        return this;
    }
    acceptContext(context) {
        this.data.content.acceptContext = context;
        return this;
    }
    declineContext(context) {
        this.data.content.declineContext = context;
        return this;
    }
    context(context) {
        this.acceptContext(context);
        this.declineContext(context);
        return this;
    }
    toAttachment() {
        return this.data;
    }
}
exports.FileConsentCard = FileConsentCard;
