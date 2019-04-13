#!/usr/bin/env node
/* eslint-disable no-unused-expressions, global-require, no-console */

import yargs from 'yargs'
import shell from 'shelljs'

yargs
  .command({
    command: 'start',
    desc: 'Start the server',
    builder: (yrgs) => {
      yrgs
        .option('p', {
          alias: 'port',
          default: process.env.PORT || 3000,
          describe: 'Specify the port to listen on',
        })
        .option('config', {
          default: process.env.NEOFETCH_CONFIG_FILE,
          describe: 'Path to a neofetch config file',
        })
        .option('css', {
          default: process.env.CUSTOM_CSS_FILE,
          describe: 'Path to a custom css file',
        })
        .option('cache-timeout', {
          default: process.env.CACHE_TIMEOUT,
          describe: 'Cache the output of neofetch for a certain time of milliseconds',
        })
    },
    handler: (argv) => {
      process.env.PORT = argv.port
      if (argv.config) process.env.NEOFETCH_CONFIG_FILE = argv.config
      if (argv.css) process.env.CUSTOM_CSS_FILE = argv.css
      if (argv['cache-timeout']) process.env.CACHE_TIMEOUT = argv.argv['cache-timeout']
      require('./server.js')
    },
  })
  .command({
    command: 'show',
    desc: 'Show the output of neofetch',
    handler: () => {
      shell.exec('neofetch', { silent: false })
    },
  })
  .demandCommand(1, 'You need to specify one command')
  .help()
  .argv
