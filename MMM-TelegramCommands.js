Module.register('MMM-TelegramCommands', {
  defaults: {
    mirror: true,
    mmconf: true,
    mmvol: true,
    myreboot: true,
    myshutdown: true,
    myscreenshot: true,
    getb: true,
    setb: true,
    rotate: true
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
    if (this.config.mirror) {
      commander.add(
        {
          command: 'mirror',
          description: "Executes MagicMirror `mirror` command\nTry `/mirror status`.",
          callback: 'command_mirror',
          args_pattern : ["/([0-9a-zA-Z-_]+)/"],
          args_mapping : ["mirrorargs"]
        }
      )
    }
    if (this.config.mmconf) {
      commander.add(
        {
          command: 'mmconf',
          description: "Activates specified MagicMirror config\nTry `/mmconf default`.",
          callback: 'command_mmconf',
          args_pattern : ["/([0-9a-zA-Z-_]+)/"],
          args_mapping : ["confname"]
        }
      )
    }
    if (this.config.myreboot) {
      commander.add(
        {
          command: 'myreboot',
          description: "Executes custom MagicMirror `reboot` command",
          callback: 'command_myreboot'
        }
      )
    }
    if (this.config.myshutdown) {
      commander.add(
        {
          command: 'myshutdown',
          description: "Executes custom MagicMirror `shutdown` command",
          callback: 'command_myshutdown'
        }
      )
    }
    if (this.config.myscreenshot) {
      commander.add(
        {
          command: 'myscreenshot',
          description: this.translate("TELCOM_SCREENSHOT"),
          callback: 'command_myscreenshot'
        }
      )
    }
    if (this.config.mmvol) {
      commander.add(
        {
          command: 'mmvol',
          description: this.translate("TELCOM_VOLUME_HELP"),
          callback: 'command_volume',
          args_pattern : ["/([0-9a-zA-Z-_]+)/"],
          args_mapping : ["volumeargs"]
        }
      )
    }
    if (this.config.getb) {
      commander.add(
        {
          command: 'getb',
          description: "Get the MagicMirror screen brightness level setting",
          callback: 'command_getb',
        }
      )
    }
    if (this.config.setb) {
      commander.add(
        {
          command: 'setb',
          description: "Set the MagicMirror screen brightness level (0-200)",
          callback: 'command_setb',
          args_pattern : ["/([0-9]+)/"],
          args_mapping : ["brightness"]
        }
      )
    }
    if (this.config.rotate) {
      commander.add(
        {
          command: 'rotate',
          description: "Rotate the MagicMirror screen\nTry `/rotate <right|left|normal|inverted>`",
          callback: 'command_rotate',
          args_pattern : ["/([a-z]+)/"],
          args_mapping : ["rotation"]
        }
      )
    }
  },

  // Callback for /mirror Telegram command
  command_mirror: function(command, handler) {
    if (handler.args['mirrorargs'][0]) {
      var exec = "mirror -D " + handler.args['mirrorargs'][0]
    } else {
      var exec = "mirror -D status"
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
  // Callback for /mmconf Telegram command
  command_mmconf: function(command, handler) {
    if (handler.args['confname'][0]) {
      var exec = "mirror -D " + handler.args['confname'][0]
    } else {
      var exec = "mirror -D status"
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
  // Callback for /myreboot Telegram command
  command_myreboot: function(command, handler) {
    var exec = "/usr/local/bin/reboot"
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
  // Callback for /myshutdown Telegram command
  command_myshutdown: function(command, handler) {
    var exec = "/usr/local/bin/shutdown"
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
  // Callback for /myscreenshot Telegram command
  command_myscreenshot: function(command, handler) {
    var exec = "mirror -D screenshot"
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
  // Callback for /mmvol Telegram command
  command_volume: function(command, handler) {
    if (handler.args['volumeargs'][0]) {
      var exec = "mirror -D vol " + handler.args['volumeargs'][0]
    } else {
      var exec = "vol"
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
  // Callback for /getb Telegram command
  command_getb: function(command, handler) {
    var exec = "mirror -D getb"
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
  // Callback for /setb Telegram command
  command_setb: function(command, handler) {
    if (handler.args['brightness'][0]) {
      var exec = "mirror -D setb " + handler.args['brightness'][0]
    } else {
      var exec = "mirror -D setb 100"
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
  // Callback for /rotate Telegram command
  command_rotate: function(command, handler) {
    if (handler.args['rotation'][0]) {
      var exec = "mirror -D rotate " + handler.args['rotation'][0]
    } else {
      var exec = "mirror -D rotate normal"
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
