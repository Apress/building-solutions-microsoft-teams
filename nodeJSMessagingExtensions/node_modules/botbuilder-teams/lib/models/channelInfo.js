'use strict';
class ChannelInfo {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'ChannelInfo',
            type: {
                name: 'Composite',
                className: 'ChannelInfo',
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
                    }
                }
            }
        };
    }
}
module.exports = ChannelInfo;
