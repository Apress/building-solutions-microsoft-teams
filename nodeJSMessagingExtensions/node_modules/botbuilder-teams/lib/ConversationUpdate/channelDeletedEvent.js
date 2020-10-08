'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class ChannelDeletedEvent extends TeamEventBase {
    constructor(channel, team, tenant) {
        super(ChannelDeletedEvent.eventType, team, tenant);
        this.channel = channel;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ChannelDeletedEvent',
            type: {
                name: 'Composite',
                className: 'ChannelDeletedEvent',
                modelProperties: {
                    channel: {
                        required: false,
                        serializedName: 'channel',
                        type: {
                            name: 'Composite',
                            className: 'ChannelInfo'
                        }
                    },
                }
            }
        };
    }
}
ChannelDeletedEvent.eventType = TeamEventType.ChannelDeleted;
module.exports = ChannelDeletedEvent;
