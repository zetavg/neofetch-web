#!/usr/bin/env node
/* eslint-disable no-unused-expressions, global-require, no-console */

import yargs from 'yargs'

yargs
  .command({
    command: 'start',
    aliases: ['s'],
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
  .demandCommand(1, 'You need to specify one command')
  .help()
  .argv
