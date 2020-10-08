'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class ChannelRenamedEvent extends TeamEventBase {
    constructor(channel, team, tenant) {
        super(ChannelRenamedEvent.eventType, team, tenant);
        this.channel = channel;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ChannelRenamedEvent',
            type: {
                name: 'Composite',
                className: 'ChannelRenamedEvent',
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
ChannelRenamedEvent.eventType = TeamEventType.ChannelRenamed;
module.exports = ChannelRenamedEvent;
