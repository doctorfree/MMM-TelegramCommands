'use strict'

const moment = require('moment')
const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const https = require('https')

const startTime = moment()

var _log = function() {
    var context = "[TELCOM]"
    return Function.prototype.bind.call(console.log, console, context)
}()

var log = function() {
  //do nothing
}

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function () {
    this.config = {}
    this.commands = []
    this.askSession = new Set()
    this.allowed = new Set()
  },

  initialize: function(config) {
    this.config = config
    if (this.config.verbose) log = _log
    console.log("[TELCOM] MMM-TelegramCommands Version:",  require('./package.json').version)
  },

  socketNotificationReceived: function (notification, payload) {
    switch(notification) {
      case 'INIT':
        this.initialize(payload)
        break;
      case 'SHELL':
        this.shell(payload.exec, payload.session)
        break
    }
  },

  shell: function(command, sessionId=null, callback=null){
    if (callback == null) {
      callback = (ret, session) => {
        if (ret.length > 3000) {
          ret = ret.slice(0, 3000) + " ..."
        }
        this.sendSocketNotification("SHELL_RESULT", {
          session: session,
          result: ret
        })
      }
    }
    log("SHELL:", command)
    exec(command, function(error, stdout, stderr){
      var result = stdout
      if (error) { result = error.message}
      log("SHELL RESULT:", result)
      callback(result, sessionId)
    })
  }

})
