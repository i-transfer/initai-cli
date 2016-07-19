# Init.ai CLI

A suite of tools for developing Projects on the [init.ai](https://init.ai) platform.

> **Note:** This CLI is currently an alpha release and subject to change at any time.

## Installation

Make sure you have Node.js installed. We recommend using version [`4.3.2`](https://nodejs.org/en/download/releases/) (see below). If you are using a tool such as [`nvm`](https://github.com/creationix/nvm) simply run:

```bash
$ nvm install 4.3.2
$ nvm use 4.3.2
```

```bash
$ npm i -g initai-cli
```

Installing this CLI globally will make the `iai` namespeace available to you from the command line. If you, however would prefer to not install this package globally, you may install it in your current project and run it as follows:

```
# On Mac

node ./node_modules/initai-cli/programs/iai-watch

# On Windows

node .\node_modules\initai-cli\programs\iai-watch
```

> **Note:** It is recommended that you use Node.js version 4.3.2 to ensure you are running the same version of Node that is available in [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html). While the developer tools do not _currently_ interact with or represent Lambda, upcoming features will require this version.

### Uninstall

If installed globally:

```bash
$ npm uninstall -g init-cli
```

## Usage

### Conversation Training Server

The conversation training server acts as a bridge between your production console and your local file system. This will start a server on your local machine that can communicate with the console running in your browser. It does this by facilitating a websocket connection between the two allowing changes to conversation data in the browser to be persisted locally via CML files.

To run the server, make sure you are in the directory of your working project (`cd /path/to/my-project`) and run the `server` command:

```bash
$ iai watch
```

You will notice the console will reflect successful connection status immediately. You can of course, at any time, kill this server and the browser will no longer have access to any locally running codebase.

> **Note:** The current version of the CLI does not automatically switch directories when you switch projects in the console. When switching between projects in the console, you must hop back to your terminal, `cd` into the new project directory and restart the CLI.

### Help

```bash
$ iai --help
$ iai -h
```

### List available commands

```bash
$ iai
```

## Supported Platforms

* Mac OS X 10.10+
* Windows 8.1+

> **Note:** Linux support is still in active development.
