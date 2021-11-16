> **"The cosmic operating system uses a command line interface. It runs on
> something like a teletype, with lots of noise and heat; punched-out bits
> flutter down into its hopper like drifting stars. The demiurge sits at his
> teletype, pounding out one command line after another, specifying the values
> of fundamental constants of physics:**
>
> `universe -G 6.672e-11 -e 1.602e-19 -h 6.626e-34 -protonmass 1.673e-27`
>
> **and when he’s finished typing out the command line, his right pinky hesitates
> above the enter key for an aeon or two, wondering what’s going to happen;
> then down it comes—and the whack you hear is another Big Bang."**
>
> ― Neal Stephenson, In the Beginning...Was the Command Line

# MMM-TelegramCommands
[MagicMirror](https://magicmirror.builders/) is an open source modular smart mirror
platform. The [MirrorCommandLine](https://gitlab.com/doctorfree/MirrorCommandLine) 
repository is a suite of command-line tools to manage a MagicMirror.

This repository maintains a MagicMirror module that creates and manages Telegram
commands to control a MagicMirror via the MirrorCommandLine tools.
It works in conjunction with the
[MMM-TelegramBot](https://github.com/bugsounet/MMM-TelegramBot) module.

## Table of contents

1. [Install](#install)
1. [Configuration](#configuration)
    1. [TelegramBot integration](#telegrambot-integration)
    1. [TelegramBot installation](#telegrambot-installation)
1. [TelegramCommands usage](#telegramcommands-usage)
1. [Author](#author)

## Install
```sh
cd ~/MagicMirror/modules
git clone https://gitlab.com/doctorfree/MMM-TelegramCommands
cd MMM-TelegramCommands
npm install
```

## Configuration
To enable the Telegram commands supported by the MMM-TelegramCommands module,
after installing the module add the following to the MagicMirror `config.js`
modules array:

```js
{
  module: "MMM-TelegramCommands"
}
```

You can find a [simple example config file](examples/config-simple.js)
in the `examples` directory as well as a
[more complex example](examples/config-commands.js).

### TelegramBot integration
You can control MMM-TelegramCommands using the Telegram app by installing the
[MMM-TelegramBot](https://github.com/bugsounet/MMM-TelegramBot)
module and adding MMM-TelegramBot configuration to your scenes.

### TelegramBot installation
Follow the instructions at the
[4th Party Modules Wiki](http://wiki.bugsounet.fr/en/MMM-TelegramBot)
to create a Telegram Bot, install MMM-TelegramBot, and configure your
MagicMirror `config.js` to enable Telegram commands.

**Note:** You do not need to create custom commands. The Telegram commands used
with MMM-TelegramCommands are already created by the module. You only need to follow the
[4th Party Modules Wiki Installation instructions](http://wiki.bugsounet.fr/en/MMM-TelegramBot/Installation).

### TelegramCommands usage
Once installed and configured, you can control your MagicMirror display
by sending messages in the Telegram app to your previously created Telegram Bot.
The supported commands are as follows:

- /mirror &lt;options&gt;
- /mmconf &lt;configname&gt;
- /myreboot
- /myshutdown

For example, to activate the MagicMirror config file
`MagicMirror/config/config-sample.js`, issue the Telegram command:

```
/mmconf sample
```

To restart MagicMirror, issue the Telegram command:

```
/mirror restart
```

The Telegram commands `/myreboot` and `/myshutdown` execute the commands,
respectively, `/usr/local/bin/reboot` and `/usr/local/bin/shutdown`. These
custom reboot and shutdown commands can be used to perform actions prior
to rebooting or shutting down the system on which MagicMirror is installed.

## Author
- Ronald Joe Record (ronaldrecord@gmail.com)
