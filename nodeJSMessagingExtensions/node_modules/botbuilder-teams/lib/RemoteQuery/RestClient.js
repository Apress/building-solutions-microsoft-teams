'use strict';
var util = require('util');
var msRest = require('ms-rest');
var models = require('../models');
class RestClient extends msRest.ServiceClient {
    constructor(baseUri, options) {
        if (!options)
            options = {};
        super(null, options);
        this.baseUri = baseUri;
        if (!this.baseUri) {
            this.baseUri = 'https://api.botframework.com';
        }
        var packageInfo = this.getPackageJsonInfo(__dirname);
        this.addUserAgentInfo(util.format('%s/%s', packageInfo.name, packageInfo.version));
        this.models = models;
        msRest.addSerializationMixin(this);
    }
}
module.exports = RestClient;
