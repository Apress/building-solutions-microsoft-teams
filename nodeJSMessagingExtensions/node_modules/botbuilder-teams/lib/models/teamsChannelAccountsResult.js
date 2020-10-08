'use strict';
const models = require('./index');
class TeamsChannelAccountsResult {
    constructor() {
    }
    mapper() {
        return {
            required: false,
            serializedName: 'TeamsChannelAccountsResult',
            type: {
                name: 'Composite',
                className: 'TeamsChannelAccountsResult',
                modelProperties: {
                    continuationToken: {
                        required: false,
                        serializedName: 'continuationToken',
                        type: {
                            name: 'String'
                        }
                    },
                    members: {
                        required: false,
                        serializedName: 'members',
                        type: {
                            name: 'Sequence',
                            element: {
                                required: false,
                                serializedName: 'TeamsChannelAccountElementType',
                                type: {
                                    name: 'Composite',
                                    className: 'TeamsChannelAccount'
                                }
                            }
                        }
                    }
                }
            }
        };
    }
}
module.exports = TeamsChannelAccountsResult;
