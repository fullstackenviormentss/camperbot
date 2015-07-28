"use strict"

var assert = require("chai").assert;
var clc = require('cli-color');
var AppConfig = require("../../config/AppConfig");

console.log("AppConfig required", AppConfig)

// check if we're in test mode
// console.log("Utils", "argv", process.argv);

var Utils = {

    bright: clc.xterm(237).bgXterm(195),
    dimmed: clc.xterm(232).bgXterm(253),
    warning: clc.xterm(232).bgXterm(215),
    errorColors: clc.xterm(232).bgXterm(196),
    logLevel: 10,  // default

    // this can't run strict
    // cls: function() {
    //     process.stdout.write('\033c');  // cls
    // },

    clog: function(where, msg, obj) {
        if (this.logLevel < 4) return;
        obj = obj || "" ;
        console.log(this.bright(where), this.dimmed(msg), obj );
    },

    warn: function(where, msg, obj) {
        if (this.logLevel < 3) return;
        obj = obj || "" ;
        console.log(this.warning(where), this.warning(msg), obj);
    },

    error: function(where, msg, obj) {
        if (this.logLevel < 1) return;
        obj = obj || "" ;
        console.log(this.warning(where), this.dimmed(msg), obj);
    },

    // used for tests
    // and also strings to commands
    // https://developer.gitter.im/docs/messages-resource
    makeMessageFromString: function(text) {
        var message = {}
        var model = {
            text: text
        }
        message.model = model;
        return message;
    },

    sanitize: function(str, opts) {
        if (opts && opts.spaces) {
            str = str.replace(/\s/g, "-");
        }
        str = str.toLowerCase()
        str = str.replace(".md", "");
        str = str.replace(/([^a-z0-9áéíóúñü_@\-\s]|[\t\n\f\r\v\0])/gim,"");
        return str;
    },

    prettyize: function(str, opts) {
        str = str.replace(/\-/g," ")
        return str;
    },

    linkify: function(str, where) {
        var host, link, uri, res;

        switch (where) {
            case 'gitter':
                host = AppConfig.gitterHost + AppConfig.botname;
                break;
            case 'wiki':
                host = AppConfig.wikiHost;
                break;
            default:
                host = AppConfig.wikiHost + AppConfig.botname;
        }

        console.log('AppConfig', AppConfig.wikiHost)
        console.log('AppConfig.wikiHost', AppConfig.wikiHost)
        uri = host + str;
        var res = `[${str}](${uri}`;

        // str = `<a href='${uri}'>${str}</a>`;
        link = `[${str}](${uri})`;
        return link;
    },

    messageMock: function(text) {
        var message = this.makeMessageFromString(text);

        message.model.fromUser = {
            username: "testuser"
        }
        return message;
    }


}

Utils.logLevel = parseInt(process.env.LOG_LEVEL || 4);



module.exports = Utils;