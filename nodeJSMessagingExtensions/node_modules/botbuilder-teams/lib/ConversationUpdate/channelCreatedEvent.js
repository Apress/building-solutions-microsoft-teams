'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class ChannelCreatedEvent extends TeamEventBase {
    constructor(channel, team, tenant) {
        super(ChannelCreatedEvent.eventType, team, tenant);
        this.channel = channel;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ChannelCreatedEvent',
            type: {
                name: 'Composite',
                className: 'ChannelCreatedEvent',
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
ChannelCreatedEvent.eventType = TeamEventType.ChannelCreated;
module.exports = ChannelCreatedEvent;
