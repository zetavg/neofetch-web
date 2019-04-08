/* eslint-disable no-console */

import Koa from 'koa'
import Neofetch from './neofetch'
import render from './render'

const port = process.env.PORT || 3000

const app = new Koa()

const cache = { data: null, time: -30000 }

app.use(async (ctx) => {
  const currentTime = (new Date()).getTime()

  if (currentTime - cache.time < 30000) {
    ctx.body = render(cache.data)
    return
  }

  const html = await Neofetch.getHTML()
  const hostname = await Neofetch.getHostname()
  const data = { title: hostname, body: html }
  ctx.body = render(data)
  cache.data = data
  cache.time = currentTime
})

const server = app.listen(port)
console.log(`Server listening on ${port}`)

process.on('SIGINT', () => {
  console.log('Shutting down...')
  server.close()
  process.exit(0)
})
