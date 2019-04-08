/* eslint-disable no-console */

import Koa from 'koa'

const port = process.env.PORT || 3000

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'Hello Koa'
})

app.listen(port)
console.log(`Server listening on ${port}`)
