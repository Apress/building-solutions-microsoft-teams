'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class MembersAddedEvent extends TeamEventBase {
    constructor(membersAdded, team, tenant) {
        super(MembersAddedEvent.eventType, team, tenant);
        this.membersAdded = membersAdded;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'MembersAddedEvent',
            type: {
                name: 'Composite',
                className: 'MembersAddedEvent',
                modelProperties: {
                    membersAdded: {
                        required: false,
                        serializedName: 'membersAdded',
                        type: {
                            name: 'Sequence',
                            element: {
                                required: false,
                                serializedName: 'ChannelAccountType',
                                type: {
                                    name: 'Composite',
                                    className: 'ChannelAccount'
                                }
                            }
                        }
                    }
                }
            }
        };
    }
}
MembersAddedEvent.eventType = TeamEventType.MembersAdded;
module.exports = MembersAddedEvent;
