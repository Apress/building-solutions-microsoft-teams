'use strict';
class TenantInfo {
    constructor(id) {
        this.id = id;
    }
    mapper() {
        return {
            required: false,
            serializedName: 'TenantInfo',
            type: {
                name: 'Composite',
                className: 'TenantInfo',
                modelProperties: {
                    id: {
                        required: false,
                        serializedName: 'id',
                        type: {
                            name: 'String'
                        }
                    }
                }
            }
        };
    }
}
module.exports = TenantInfo;
