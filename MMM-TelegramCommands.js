Module.register('MMM-TelegramCommands', {
  defaults: {
  },

  getTranslations: function() {
    return {
      en: "translations/en.json",
      de: "translations/de.json",
      id: "translations/id.json",
      fr: "translations/fr.json",
      it: "translations/it.json",
      es: "translations/es.json"
    }
  },

  getCommands: function(commander) {
    commander.add(
      {
        command: 'mmconf',
        description: "Activates specified MagicMirror config\nTry `/mmconf default`.",
        callback: 'command_mmconf',
        args_pattern : ["/([0-9a-zA-Z-_]+)/"],
        args_mapping : ["confname"]
      }
    )
  },

  // Callback for /mmconf Telegram command
  command_mmconf: function(command, handler) {
    if (handler.args['confname'][0]) {
      var exec = "mirror " + handler.args['confname'][0]
    } else {
      var exec = "mirror status"
    }
    handler.reply("TEXT", "Executing command: " + exec)
    var sessionId = Date.now() + "_" + this.commonSession.size
    if (exec) {
      this.commonSession.set(sessionId, handler)
      this.sendSocketNotification("SHELL", {
        session: sessionId,
        exec: exec
      })
    }
  },

  TELCOM_shell_result: function(sessionId, ret) {
    var handler = this.commonSession.get(sessionId)
    var text = ""
    if (handler) {
      this.commonSession.delete(sessionId)
      text = this.translate("TELCOM_SHELL_RESULT") + ret
    } else {
      text = this.translate("TELCOM_SHELL_RESULT_SESSION_ERROR")
    }
    handler.reply("TEXT", text, {parse_mode:"Markdown"})
  },

  start: function() {
    this.commonSession = new Map()
    this.config.text = {
      "TELCOM_HELPER_ERROR" : this.translate("TELCOM_HELPER_ERROR"),
      "TELCOM_HELPER_NOT_ALLOWED" : this.translate("TELCOM_HELPER_NOT_ALLOWED"),
      "TELCOM_HELPER_RESTART" : this.translate("TELCOM_HELPER_RESTART"),
      "TELCOM_HELPER_WAKEUP" : this.translate("TELCOM_HELPER_WAKEUP"),
      "TELCOM_HELPER_MSG_COMING" : this.translate("TELCOM_HELPER_MSG_COMING"),
      "TELCOM_HELPER_TOOOLDMSG" : this.translate("TELCOM_HELPER_TOOOLDMSG"),
      "TELCOM_HELPER_SERVED": this.translate("TELCOM_HELP_SERVED", { module: "TelegramCommands Service"})
    }
    this.config = configMerge({}, this.defaults, this.config)
    this.sendSocketNotification('INIT', this.config)
  },

  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      // case 'COMMAND':
      //   this.parseCommand(payload)
      //   break
      case 'SHELL_RESULT':
        this.TELCOM_shell_result(payload.session, payload.result)
        break
    }
  },

  getDom: function() {
    var dom = document.createElement("div")
    dom.id = "TELCOM"

    return dom
  },
})
