"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const o365ConnectorCard_1 = require("./o365ConnectorCard");
class ListCard {
    constructor(session) {
        this.session = session;
        this.data = {
            contentType: 'application/vnd.microsoft.teams.card.list',
            content: {}
        };
    }
    title(text, ...args) {
        if (text) {
            this.data.content.title = o365ConnectorCard_1.fmtText(this.session, text, args);
        }
        else {
            delete this.data.content.title;
        }
        return this;
    }
    items(list) {
        const items = (list || []).map(ListCard.toListItem);
        this.data.content.items = items;
        return this;
    }
    addItem(item) {
        const listItem = ListCard.toListItem(item);
        if (this.data.content.items) {
            let listItems = this.data.content.items;
            listItems.push(listItem);
        }
        else {
            this.data.content.items = [listItem];
        }
        return this;
    }
    buttons(list) {
        const buttons = (list || []).map(button => {
            return (button.toAction) ?
                button.toAction() :
                button;
        });
        this.data.content.buttons = buttons;
        return this;
    }
    toAttachment() {
        return this.data;
    }
    static toListItem(item) {
        return (item.toItem) ?
            item.toItem() :
            item;
    }
}
exports.ListCard = ListCard;
class ListCardItem {
    constructor(session) {
        this.session = session;
        this.data = {
            type: ListCardItemType.resultItem,
        };
    }
    type(type) {
        this.data.type = type;
        return this;
    }
    title(text, ...args) {
        if (text) {
            this.data.title = o365ConnectorCard_1.fmtText(this.session, text, args);
        }
        else {
            delete this.data.title;
        }
        return this;
    }
    subtitle(text, ...args) {
        if (text) {
            this.data.subtitle = o365ConnectorCard_1.fmtText(this.session, text, args);
        }
        else {
            delete this.data.subtitle;
        }
        return this;
    }
    icon(url) {
        this.data.icon = url;
        return this;
    }
    tap(action) {
        if (action) {
            this.data.tap = action.toAction ?
                action.toAction() :
                action;
        }
        else {
            delete this.data.tap;
        }
        return this;
    }
    toItem() {
        return this.data;
    }
}
exports.ListCardItem = ListCardItem;
var ListCardItemType;
(function (ListCardItemType) {
    ListCardItemType["resultItem"] = "resultItem";
    ListCardItemType["separator"] = "separator";
})(ListCardItemType = exports.ListCardItemType || (exports.ListCardItemType = {}));
