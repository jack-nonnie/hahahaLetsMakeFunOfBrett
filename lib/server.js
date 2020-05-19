"use strict";

const http = require("http");
const Bot = require("./bot");
var userID = 0;
class Server {
    constructor(router, devMode, port) {
        this.server = http.createServer(function (req, res) {
            req.chunks = [];

            req.on("data", function (chunk) {
                req.chunks.push(chunk.toString());
            });

            router.dispatch(req, res, function (error) {
                res.writeHead(error.status, { "Content-Type": "text/plain" });
                res.end(error.message);
            });
        });

        this.devMode = devMode;

        this.port = Number(port || 80);
    }

    serve() {
        this.server.listen(this.port);

        console.log("Running on port " + this.port);
        if (this.devMode) {
            require("./dev").dev(this.port, process.env.LT_SUBDOMAIN);
        }
    }

    static getResponse() {
        this.res.end("Bot is responding to a GET request... hey there!");
    }

    static postResponse() {
        const requestMessage = JSON.parse(this.req.chunks[0]);

        this.res.writeHead(200);
        this.res.end();

        const tempId = Bot.getName(requestMessage, "Jack Nonnie");
        if (tempId != 0) {
            userID = tempId;
        }
        const rsp = Bot.makeFunOfBrett(requestMessage, userID);
        if (rsp) {
            Bot.sendMessage(rsp);
        }
    }
}

module.exports = Server;
