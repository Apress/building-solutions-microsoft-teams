'use strict';
var util = require('util');
var msRest = require('ms-rest');
var WebResource = msRest.WebResource;
class Teams {
    constructor(client) {
        this.client = client;
    }
}
Teams.prototype.fetchChannelList = function (teamsId, options, callback) {
    var client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    try {
        if (teamsId === null || teamsId === undefined || typeof teamsId.valueOf() !== 'string') {
            throw new Error('teamsId cannot be null or undefined and it must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    var baseUrl = this.client.baseUri;
    var requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/teams/{teamsId}/conversations';
    requestUrl = requestUrl.replace('{teamsId}', encodeURIComponent(teamsId));
    var httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = requestUrl;
    if (options) {
        for (var headerName in options['customHeaders']) {
            if (options['customHeaders'].hasOwnProperty(headerName)) {
                httpRequest.headers[headerName] = options['customHeaders'][headerName];
            }
        }
    }
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    httpRequest.body = null;
    return client.pipeline(httpRequest, function (err, response, responseBody) {
        if (err) {
            return callback(err);
        }
        var statusCode = response.statusCode;
        if (statusCode !== 200) {
            var error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            var parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    var internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
            }
            catch (defaultError) {
                error.message = util.format('Error "%s" occurred in deserializing the responseBody ' +
                    '- "%s" for the default response.', defaultError.message, responseBody);
                return callback(error);
            }
            return callback(error);
        }
        var result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 200) {
            var parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    var resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                var deserializationError = new Error(util.format('Error "%s" occurred in deserializing the responseBody - "%s"', error, responseBody));
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result['conversations'], httpRequest, response);
    });
};
Teams.prototype.fetchMemberList = function (conversationId, options, callback) {
    let client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    try {
        if (conversationId === null || conversationId === undefined || typeof conversationId.valueOf() !== 'string') {
            throw new Error('conversationId cannot be null or undefined and it must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    let baseUrl = this.client.baseUri;
    let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/conversations/{conversationId}/members';
    requestUrl = requestUrl.replace('{conversationId}', encodeURIComponent(conversationId));
    let httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = requestUrl;
    if (options) {
        for (let headerName in options['customHeaders']) {
            if (options['customHeaders'].hasOwnProperty(headerName)) {
                httpRequest.headers[headerName] = options['customHeaders'][headerName];
            }
        }
    }
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    httpRequest.body = null;
    return client.pipeline(httpRequest, (err, response, responseBody) => {
        if (err) {
            return callback(err);
        }
        let statusCode = response.statusCode;
        if (statusCode !== 200) {
            let error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            let parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    let internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
            }
            catch (defaultError) {
                error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                    `- "${responseBody}" for the default response.`;
                return callback(error);
            }
            return callback(error);
        }
        let result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 200) {
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    var resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result, httpRequest, response);
    });
};
Teams.prototype.fetchMember = function (conversationId, memberId, options, callback) {
    let client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    try {
        if (conversationId === null || conversationId === undefined || typeof conversationId.valueOf() !== 'string') {
            throw new Error('conversationId cannot be null or undefined and it must be of type string.');
        }
        if (memberId === null || memberId === undefined || typeof memberId.valueOf() !== 'string') {
            throw new Error('memberId cannot be null or undefined and it must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    let baseUrl = this.client.baseUri;
    let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/conversations/{conversationId}/members/{memberId}';
    requestUrl = requestUrl.replace('{conversationId}', encodeURIComponent(conversationId));
    requestUrl = requestUrl.replace('{memberId}', encodeURIComponent(memberId));
    let httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.headers = {};
    httpRequest.url = requestUrl;
    if (options) {
        for (let headerName in options['customHeaders']) {
            if (options['customHeaders'].hasOwnProperty(headerName)) {
                httpRequest.headers[headerName] = options['customHeaders'][headerName];
            }
        }
    }
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    httpRequest.body = null;
    return client.pipeline(httpRequest, (err, response, responseBody) => {
        if (err) {
            return callback(err);
        }
        let statusCode = response.statusCode;
        if (statusCode !== 200) {
            let error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            let parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    let internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
            }
            catch (defaultError) {
                error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                    `- "${responseBody}" for the default response.`;
                return callback(error);
            }
            return callback(error);
        }
        let result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 200) {
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    var resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result, httpRequest, response);
    });
};
Teams.prototype.fetchMemberListWithPaging = function (conversationId, options, callback) {
    let client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    let pageSize = (options && options.pageSize !== undefined) ? options.pageSize : undefined;
    let continuationToken = (options && options.continuationToken !== undefined) ? options.continuationToken : undefined;
    try {
        if (conversationId === null || conversationId === undefined || typeof conversationId.valueOf() !== 'string') {
            throw new Error('conversationId cannot be null or undefined and it must be of type string.');
        }
        if (pageSize !== null && pageSize !== undefined && typeof pageSize !== 'number') {
            throw new Error('pageSize must be of type number.');
        }
        if (continuationToken !== null && continuationToken !== undefined && typeof continuationToken.valueOf() !== 'string') {
            throw new Error('continuationToken must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    let baseUrl = this.client.baseUri;
    let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/conversations/{conversationId}/pagedMembers';
    requestUrl = requestUrl.replace('{conversationId}', encodeURIComponent(conversationId));
    let queryParameters = [];
    if (pageSize !== null && pageSize !== undefined) {
        queryParameters.push('pageSize=' + encodeURIComponent(pageSize.toString()));
    }
    if (continuationToken !== null && continuationToken !== undefined) {
        queryParameters.push('continuationToken=' + encodeURIComponent(continuationToken));
    }
    if (queryParameters.length > 0) {
        requestUrl += '?' + queryParameters.join('&');
    }
    let httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.url = requestUrl;
    httpRequest.headers = {};
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    if (options) {
        for (let headerName in options['customHeaders']) {
            if (options['customHeaders'].hasOwnProperty(headerName)) {
                httpRequest.headers[headerName] = options['customHeaders'][headerName];
            }
        }
    }
    httpRequest.body = null;
    return client.pipeline(httpRequest, (err, response, responseBody) => {
        if (err) {
            return callback(err);
        }
        let statusCode = response.statusCode;
        if (statusCode !== 200) {
            let error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            let parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    let internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
                if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
                    let resultMapper = new client.models['ErrorResponse']().mapper();
                    error.body = client.deserialize(resultMapper, parsedErrorResponse, 'error.body');
                }
            }
            catch (defaultError) {
                error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                    `- "${responseBody}" for the default response.`;
                return callback(error);
            }
            return callback(error);
        }
        let result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 200) {
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    let resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result, httpRequest, response);
    });
};
Teams.prototype.fetchTeamInfo = function (teamsId, options, callback) {
    let client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    try {
        if (teamsId === null || teamsId === undefined || typeof teamsId.valueOf() !== 'string') {
            throw new Error('teamsId cannot be null or undefined and it must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    let baseUrl = this.client.baseUri;
    let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/teams/{teamsId}';
    requestUrl = requestUrl.replace('{teamsId}', encodeURIComponent(teamsId));
    let httpRequest = new WebResource();
    httpRequest.method = 'GET';
    httpRequest.url = requestUrl;
    httpRequest.headers = {};
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    if (options) {
        for (let headerName in options['customHeaders']) {
            if (options['customHeaders'].hasOwnProperty(headerName)) {
                httpRequest.headers[headerName] = options['customHeaders'][headerName];
            }
        }
    }
    httpRequest.body = null;
    return client.pipeline(httpRequest, (err, response, responseBody) => {
        if (err) {
            return callback(err);
        }
        let statusCode = response.statusCode;
        if (statusCode !== 200) {
            let error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            let parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    let internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
            }
            catch (defaultError) {
                error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                    `- "${responseBody}" for the default response.`;
                return callback(error);
            }
            return callback(error);
        }
        let result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 200) {
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    var resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result, httpRequest, response);
    });
};
Teams.prototype.beginReplyChainInChannel = function (channelId, message, options, callback) {
    let client = this.client;
    if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        throw new Error('callback cannot be null.');
    }
    try {
        if (channelId === null || channelId === undefined || typeof channelId.valueOf() !== 'string') {
            throw new Error('channelId cannot be null or undefined and it must be of type string.');
        }
    }
    catch (error) {
        return callback(error);
    }
    let baseUrl = this.client.baseUri;
    let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'v3/conversations';
    let httpRequest = new WebResource();
    options.method = 'POST';
    options.url = requestUrl;
    options.headers = options['customHeaders'];
    options.body = {
        activity: message,
        channelData: {
            teamsChannelId: channelId
        },
        json: true
    };
    httpRequest.prepare(options);
    httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
    return client.pipeline(httpRequest, (err, response, responseBody) => {
        if (err) {
            return callback(err);
        }
        let statusCode = response.statusCode;
        if (statusCode !== 201) {
            let error = new Error(responseBody);
            error.statusCode = response.statusCode;
            error.request = msRest.stripRequest(httpRequest);
            error.response = msRest.stripResponse(response);
            if (responseBody === '')
                responseBody = null;
            let parsedErrorResponse;
            try {
                parsedErrorResponse = JSON.parse(responseBody);
                if (parsedErrorResponse) {
                    let internalError = null;
                    if (parsedErrorResponse.error)
                        internalError = parsedErrorResponse.error;
                    error.code = internalError ? internalError.code : parsedErrorResponse.code;
                    error.message = internalError ? internalError.message : parsedErrorResponse.message;
                }
            }
            catch (defaultError) {
                error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                    `- "${responseBody}" for the default response.`;
                return callback(error);
            }
            return callback(error);
        }
        let result = null;
        if (responseBody === '')
            responseBody = null;
        if (statusCode === 201) {
            let parsedResponse = null;
            try {
                parsedResponse = JSON.parse(responseBody);
                result = JSON.parse(responseBody);
                if (parsedResponse !== null && parsedResponse !== undefined) {
                    var resultMapper = {
                        required: false,
                        serializedName: 'parsedResponse',
                        type: {
                            name: 'Object'
                        }
                    };
                    result = client.deserialize(resultMapper, parsedResponse, 'result');
                }
            }
            catch (error) {
                let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
                deserializationError.request = msRest.stripRequest(httpRequest);
                deserializationError.response = msRest.stripResponse(response);
                return callback(deserializationError);
            }
        }
        return callback(null, result, httpRequest, response);
    });
};
module.exports = Teams;
