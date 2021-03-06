var _ = require('lodash'),
    config = require('../config'),
    Helpers = require('../Helpers'),
    otterbot = require('../bot'),
    responses = require('../responses');

// Binds chat gif responses loaded from /responses.js
exports.init = function () {
    _.each(responses, function (response) {
        otterbot.on('chat', function (chat) {
            if (chat.raw.un !== config.get('/name') && Helpers.matchString(response.match, response.trigger, chat.message)) {
                if (_.isArray(response.response)) {
                    if (response.pickRandom) {
                        otterbot.chatSingle(_.template(Helpers.randomElement(response.response), chat));
                    } else {
                        otterbot.chatMultiple(response.response, chat);
                    }
                } else {
                    otterbot.chatSingle(_.template(response.response, chat));
                }
            }
        });
    });
};
