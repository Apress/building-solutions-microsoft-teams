'use strict';
const models = require('../models');
const TeamEventBase = require('./teamEventBase').TeamEventBase;
const TeamEventType = require('./teamEventBase').TeamEventType;
class TeamRenamedEvent extends TeamEventBase {
    constructor(team, tenant) {
        super(TeamRenamedEvent.eventType, team, tenant);
    }
    mapper() {
        return {
            required: false,
            serializedName: 'TeamRenamedEvent',
            type: {}
        };
    }
}
TeamRenamedEvent.eventType = TeamEventType.TeamRenamed;
module.exports = TeamRenamedEvent;
