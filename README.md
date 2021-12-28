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
platform. The [MirrorCommand](https://gitlab.com/doctorfree/MirrorCommand) 
repository is a suite of command-line tools to manage a MagicMirror.

This repository maintains a MagicMirror module that creates and manages Telegram
commands to control a MagicMirror via the MirrorCommand tools.
It works in conjunction with the
[MMM-TelegramBot](https://github.com/bugsounet/MMM-TelegramBot) module.

## Table of contents

1. [Requirements](#requirements)
1. [Installation](#installation)
    1. [MirrorCommand](#mirrorcommand)
    1. [TelegramBot](#telegrambot)
1. [Configuration](#configuration)
    1. [TelegramBot integration](#telegrambot-integration)
    1. [TelegramBot installation](#telegrambot-installation)
1. [TelegramCommands usage](#telegramcommands-usage)
1. [Author](#author)

## Requirements
MMM-TelegramCommands requires the installation and configuration of the
[MMM-TelegramBot](https://github.com/bugsounet/MMM-TelegramBot) module
and the [MirrorCommand](https://gitlab.com/doctorfree/MirrorCommand) 
suite of command line utilites for the MagicMirror.

## Installation

To install the MMM-TelegramCommands module:

```bash
cd ~/MagicMirror/modules
git clone https://gitlab.com/doctorfree/MMM-TelegramCommands.git
cd MMM-TelegramCommands
npm install
```

### MirrorCommand

To install the MirrorCommand package on your MagicMirror,
[Download the latest Debian package format release](https://gitlab.com/doctorfree/MirrorCommand/-/releases)

Install the base MirrorCommand package by executing the command

```bash
sudo apt install MirrorCommand<version>.deb
```

### TelegramBot

See below for instructions on [TelegramBot installation](#telegrambot-installation).

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

Each of the Telegram commands added by MMM-TelegramCommands can be disabled
in the `config.js` module entry. For example, to disable both the `myreboot`
and `myshutdown` Telegram commands, set those to `false` in `config.js`:

```javascript
{
  module: "MMM-TelegramCommands",
  config: {
    mirror: true,
    mmconf: true,
    mmvol: true,
    myreboot: false,
    myshutdown: false,
    myscreenshot: true,
    getb: true,
    setb: true,
    rotate: true
  }
}
```

All MMM-TelegramCommands are enabled by default so it is only necessary to add
the minimal module entry above to enable the commands.

### TelegramBot integration
You can control MMM-TelegramCommands using the Telegram app by installing the
[MMM-TelegramBot](https://github.com/bugsounet/MMM-TelegramBot)
module and adding MMM-TelegramBot configuration to your `config.js`.

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
- /mmvol &lt;0-100&gt;
- /myreboot
- /myshutdown
- /myscreenshot
- /getb
- /setb &lt;0-200&gt;
- /rotate &lt;rotation&gt;

For example, to activate the MagicMirror config file
`MagicMirror/config/config-sample.js`, issue the Telegram command:

```
/mmconf sample
```

To restart MagicMirror, issue the Telegram command:

```
/mirror restart
```

See the [MirrorCommand project](https://gitlab.com/doctorfree/MirrorCommand)
for an in-depth review of all the various commands that can be issued using the
`/mirror` command.

The Telegram commands `/myreboot` and `/myshutdown` execute the commands,
respectively, `/usr/local/bin/reboot` and `/usr/local/bin/shutdown`. These
custom reboot and shutdown commands can be used to perform actions prior
to rebooting or shutting down the system on which MagicMirror is installed.

The Telegram command `/mmvol` can be used to set or retrieve the volume level
on the MagicMirror. Supported `/mmvol` commands include:

- /mmvol &lt;percent&gt;
- /mmvol get
- /mmvol mute
- /mmvol unmute

Where &lt;percent&gt; is an integer between 0 and 100.

The Telegram command `/myscreenshot` triggers a screenshot of the MagicMirror
and saves the screenshot in `$HOME/Pictures/ScreenShots/`

The Telegram commands `/getb` and `/setb` get and set, respectively, the MagicMirror
screen brightness level. The brightness levels are 0-200, inclusive.

The Telegram command `/rotate` can be used to rotate the MagicMirror display.
Supported `/rotate` commands:

- /rotate right
- /rotate left
- /rotate normal
- /rotate inverted

## Author
- Ronald Joe Record (ronaldrecord@gmail.com)
