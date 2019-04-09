/* eslint-disable no-console */

import Koa from 'koa'
import fs from 'fs'
import Neofetch from './neofetch'
import render from './render'

const port = process.env.PORT || 3000
const configFile = process.env.NEOFETCH_CONFIG_FILE
const customCssFile = process.env.CUSTOM_CSS_FILE
const css = customCssFile ? fs.readFileSync(customCssFile, 'utf8') : undefined

const app = new Koa()

const cache = { data: null, time: -30000 }

app.use(async (ctx) => {
  try {
    const currentTime = (new Date()).getTime()

    if (currentTime - cache.time < 30000) {
      ctx.body = render(cache.data)
      return
    }

    const html = await Neofetch.getHTML({ configFile })
    const hostname = await Neofetch.getHostname()
    const data = { title: hostname, body: html, css }
    ctx.body = render(data)
    cache.data = data
    cache.time = currentTime
  } catch (e) {
    console.error(e)
  }
})

const server = app.listen(port, '0.0.0.0')
console.log(`Server listening on ${port}`)

process.on('SIGINT', () => {
  console.log('Shutting down...')
  server.close()
  process.exit(0)
})
