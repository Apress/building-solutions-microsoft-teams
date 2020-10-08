const ngrok = require('ngrok');

var request = require('request');
var util = require("util");
var restify = require('restify');
var builder = require('botbuilder');
var teams = require('botbuilder-teams');

var connector = new teams.TeamsChatConnector({
    appId: "1dada9e1-3776-4056-bd24-eb595ff3b4d9",
    appPassword: "br~RN7iX6W.ckM93M8EU5Q-_v29IKtzF2~"
});

const port = 8080;

var server = restify.createServer();

server.listen(port, function() {
    console.log(`Node.js server listening on ${port}`);
    ngrok.connect(port, function(err, url) {
        console.log(`Node.js local server is publicly-accessible at ${url}`);
    });
    console.log('%s listening to %s', server.name, util.inspect(server.address()));
});

// this will reset and allow to receive from any tenants
connector.resetAllowedTenants();

var bot = new builder.UniversalBot(connector);

server.post('/api/composeExtension', connector.listen());
server.post('/api/messages', connector.listen());
server.post('/', connector.listen());

var composeExtensionHandler = function(event, query, callback) {
    var attachments = [];
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + query.parameters[0].value + "&limit=100&offset=0";
    if (query.parameters[0].value == undefined | query.parameters[0].value == '') {
        url = "https://www.googleapis.com/books/v1/volumes?q=ISBN:9780789748591&limit=10";
    }
    request(url, {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        var data = body;
        for (var o of data.items) {
            try {

                console.log(o.volumeInfo.title);

                var logo = {
                    alt: o.volumeInfo.title,
                    url: o.volumeInfo.imageLinks.thumbnail
                };

                var card = new builder.HeroCard()
                    .title("Title: " + o.volumeInfo.title)
                    .text("" + o.volumeInfo.description)
                    .subtitle("Publisher: " + o.volumeInfo.publisher)
                    .images([logo])
                    .buttons([{
                        type: "openUrl",
                        title: "View Image",
                        value: o.volumeInfo.imageLinks.thumbnail
                    }]);

                attachments.push(card.toAttachment());


            } catch (err) {
                console.log(err);
            }
        };


        var response = teams.ComposeExtensionResponse
            .result('list')
            .attachments(attachments)
            .toResponse();

        // Send the response to teams
        callback(null, response, 200);


        //}
    });


};

connector.onQuery('searchCmd', composeExtensionHandler);



var composeInvoke = function(event) {
    console.log(event);
};


connector.onInvoke('composeInvoke');