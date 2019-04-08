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
    },
    handler: (argv) => {
      process.env.PORT = argv.p
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
