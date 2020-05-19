"use strict";

require("dotenv").config();

const https = require("https");

class Bot {
    static getName(message, name) {
        if (message.name === name) {
            return message.user_id;
        } else {
            return 0;
        }
    }
    static makeFunOfBrett(message, id) {
        if (id === message.user_id) {
            return "Brett is short";
        } else {
            return null;
        }
    }
    static sendMessage(messageText) {
        // Get the GroupMe bot id saved in `.env`
        const botId = process.env.BOT_ID;

        const options = {
            hostname: "api.groupme.com",
            path: "/v3/bots/post",
            method: "POST",
        };

        const body = {
            bot_id: botId,
            text: messageText,
        };

        // Make the POST request to GroupMe with the http module
        const botRequest = https.request(options, function (response) {
            if (response.statusCode !== 202) {
                console.log("Rejecting bad status code " + response.statusCode);
            }
        });

        // On error
        botRequest.on("error", function (error) {
            console.log("Error posting message " + JSON.stringify(error));
        });

        // On timeout
        botRequest.on("timeout", function (error) {
            console.log("Timeout posting message " + JSON.stringify(error));
        });

        // Finally, send the body to GroupMe as a string
        botRequest.end(JSON.stringify(body));
    }
}

module.exports = Bot;
