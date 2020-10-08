"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptiveCard_1 = require("./AdaptiveCard");
exports.taskModuleInvokeNameOfFetch = "task/fetch";
exports.taskModuleInvokeNameOfSubmit = "task/submit";
class TaskModuleResponseOfSubmit {
    continue() {
        return new TaskModuleContinueResponse();
    }
    message() {
        return new TaskModuleMessageResponse();
    }
    cardResult() {
        return new TaskModuleCardResultResponse();
    }
}
exports.TaskModuleResponseOfSubmit = TaskModuleResponseOfSubmit;
class TaskModuleResponse {
    static createResponseOfFetch() {
        return new TaskModuleContinueResponse();
    }
    static createResponseOfSubmit() {
        return new TaskModuleResponseOfSubmit();
    }
    toResponseOfSubmit() {
        const data = {
            task: this.getTaskObject()
        };
        return data;
    }
}
exports.TaskModuleResponse = TaskModuleResponse;
class TaskModuleContinueResponse extends TaskModuleResponse {
    constructor() {
        super(...arguments);
        this.data = {};
    }
    url(url) {
        if (this.data.card) {
            throw new Error(`'url' can not be assigned due to 'card' already assigned beforehand. It is not allowed to have both URL and card as contents.`);
        }
        else {
            this.data.url = url;
        }
        return this;
    }
    card(card) {
        if (this.data.url) {
            throw new Error(`'card' can not be assigned due to 'url' already assigned beforehand. It is not allowed to have both URL and card as contents.`);
        }
        else {
            this.data.card = TaskModuleHelper.cardToAttachment(card);
        }
        return this;
    }
    height(val) {
        this.data.height = val;
        return this;
    }
    width(val) {
        this.data.width = val;
        return this;
    }
    fallbackUrl(url) {
        this.data.fallbackUrl = url;
        return this;
    }
    title(title) {
        this.data.title = title;
        return this;
    }
    toResponseOfFetch() {
        const data = {
            task: this.getTaskObject()
        };
        return data;
    }
    getTaskObject() {
        return {
            type: 'continue',
            value: this.data
        };
    }
}
exports.TaskModuleContinueResponse = TaskModuleContinueResponse;
class TaskModuleMessageResponse extends TaskModuleResponse {
    constructor() {
        super(...arguments);
        this.data = {
            type: 'message',
            value: ''
        };
    }
    text(text) {
        this.data.value = text;
        return this;
    }
    getTaskObject() {
        return this.data;
    }
}
exports.TaskModuleMessageResponse = TaskModuleMessageResponse;
class TaskModuleCardResultResponse extends TaskModuleResponse {
    constructor() {
        super();
        this.data = new AdaptiveCard_1.AdaptiveCard().toAttachment();
    }
    card(card) {
        this.data = TaskModuleHelper.cardToAttachment(card);
        return this;
    }
    getTaskObject() {
        return {
            type: 'cardResult',
            attachments: [this.data]
        };
    }
}
exports.TaskModuleCardResultResponse = TaskModuleCardResultResponse;
class TaskModuleHelper {
    static cardToAttachment(card) {
        let data;
        if (card instanceof AdaptiveCard_1.AdaptiveCard) {
            data = card.toAttachment();
        }
        else if (card.contentType) {
            const attachment = card;
            if (attachment.contentType.toLowerCase() === AdaptiveCard_1.AdaptiveCard.contentType.toLowerCase()) {
                data = attachment;
            }
            else {
                throw new Error('Invalid attachment content. Only adaptive card is acceptable.');
            }
        }
        else {
            data = {
                contentType: AdaptiveCard_1.AdaptiveCard.contentType,
                content: card
            };
        }
        return data;
    }
}
