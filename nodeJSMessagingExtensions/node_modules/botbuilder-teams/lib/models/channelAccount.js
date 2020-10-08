'use strict';
class ChannelAccount {
    constructor() {
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ChannelAccount',
            type: {
                name: 'Composite',
                className: 'ChannelAccount',
                modelProperties: {
                    id: {
                        required: false,
                        serializedName: 'id',
                        type: {
                            name: 'String'
                        }
                    },
                    objectId: {
                        required: false,
                        serializedName: 'objectId',
                        type: {
                            name: 'String'
                        }
                    },
                    givenName: {
                        required: false,
                        serializedName: 'givenName',
                        type: {
                            name: 'String'
                        }
                    },
                    surname: {
                        required: false,
                        serializedName: 'surname',
                        type: {
                            name: 'String'
                        }
                    },
                    email: {
                        required: false,
                        serializedName: 'email',
                        type: {
                            name: 'String'
                        }
                    },
                    userPrincipalName: {
                        required: false,
                        serializedName: 'userPrincipalName',
                        type: {
                            name: 'String'
                        }
                    }
                }
            }
        };
    }
}
module.exports = ChannelAccount;
