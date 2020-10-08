'use strict';
class TeamInfo {
    constructor(name, id, aadGroupId) {
        this.id = id;
        this.name = name;
        if (!!aadGroupId) {
            this.aadGroupId = aadGroupId;
        }
    }
    mapper() {
        return {
            required: false,
            serializedName: 'TeamInfo',
            type: {
                name: 'Composite',
                className: 'TeamInfo',
                modelProperties: {
                    id: {
                        required: false,
                        serializedName: 'id',
                        type: {
                            name: 'String'
                        }
                    },
                    name: {
                        required: false,
                        serializedName: 'name',
                        type: {
                            name: 'String'
                        }
                    },
                    aadGroupId: {
                        required: false,
                        serializedName: 'aadGroupId',
                        type: {
                            name: 'String'
                        }
                    }
                }
            }
        };
    }
}
module.exports = TeamInfo;
