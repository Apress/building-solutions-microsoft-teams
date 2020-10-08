"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ComposeExtensionResponse {
    constructor(type) {
        this.data = {
            composeExtension: {
                type: ""
            }
        };
        this.data.composeExtension.type = type;
    }
    static result(attachmentLayout = "list") {
        var obj = new ComposeExtensionResponse("result");
        obj.data.composeExtension.attachmentLayout = attachmentLayout;
        return obj;
    }
    static auth() {
        return new ComposeExtensionResponse("auth");
    }
    static config() {
        return new ComposeExtensionResponse("config");
    }
    static message() {
        return new ComposeExtensionResponse("message");
    }
    static messagePreview() {
        return new ComposeExtensionResponse("botMessagePreview");
    }
    attachments(list) {
        this.data.composeExtension.attachments = [];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var attachment = list[i];
                this.data.composeExtension.attachments.push(attachment);
            }
        }
        return this;
    }
    actions(list) {
        this.data.composeExtension.suggestedActions = { actions: [] };
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var action = list[i];
                this.data.composeExtension.suggestedActions.actions.push(action.toAction());
            }
        }
        return this;
    }
    text(text) {
        this.data.composeExtension.text = text;
        return this;
    }
    preview(msg) {
        this.data.composeExtension.activityPreview =
            msg.toMessage ? msg.toMessage() : msg;
        return this;
    }
    toResponse() {
        return this.data;
    }
}
exports.ComposeExtensionResponse = ComposeExtensionResponse;
