'use strict';
const models = require('./index');
class ConversationList {
    constructor() {
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ConversationList',
            type: {
                name: 'Composite',
                className: 'ConversationList',
                modelProperties: {
                    conversations: {
                        required: false,
                        serializedName: 'conversations',
                        type: {
                            name: 'Sequence',
                            element: {
                                required: false,
                                serializedName: 'ChannelInfoElementType',
                                type: {
                                    name: 'Composite',
                                    className: 'ChannelInfo'
                                }
                            }
                        }
                    }
                }
            }
        };
    }
}
module.exports = ConversationList;
