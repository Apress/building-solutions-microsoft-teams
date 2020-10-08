'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class MembersRemovedEvent extends TeamEventBase {
    constructor(membersRemoved, team, tenant) {
        super(MembersRemovedEvent.eventType, team, tenant);
        this.membersRemoved = membersRemoved;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'MembersRemovedEvent',
            type: {
                name: 'Composite',
                className: 'MembersRemovedEvent',
                modelProperties: {
                    membersRemoved: {
                        required: false,
                        serializedName: 'membersRemoved',
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
MembersRemovedEvent.eventType = TeamEventType.MembersRemoved;
module.exports = MembersRemovedEvent;
