/* eslint-disable indent, operator-linebreak, implicit-arrow-linebreak */

const template = (title, css, content) =>
`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>${title}</title>

    <style>${css.replace(/[\n\r]/g, '')}</style>
  </head>
  <body class="body">
    <div class="wrapper">
      <div class="container">
        <div class="content">${content.replace(/[\n\r]/g, '')}</div>
      </div>
    </div>
  </body>
</html>
`

const defaultCss =
`
html, body, .wrapper, .container {
  margin: 0;
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
}

.logo-block, .info-text-block {
  margin: 0 1em 0;
}

.content {
  font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
  font-size: 12pt;
}

@media (max-width: 700px) and (max-height: 1000px) {
  .container {
    display: block;
  }

  .logo-block, .info-text-block {
    margin: auto;
    padding: 0 1em 0;
  }

  .logo-block {
    margin-top: 1em;
  }

  .info-text-block {
    padding-bottom: 1em;
  }
}

@media (max-width: 600px) {
  .content {
    font-size: 11pt;
  }
}

@media (max-width: 560px) {
  .content {
    font-size: 10pt;
  }
}

@media (max-width: 520px) {
  .content {
    font-size: 9pt;
  }
}

@media (max-width: 472px) {
  .content {
    font-size: 8pt;
  }
}

@media (max-width: 374px) {
  .container, .content {
     display: block;
  }
}

.bold {
  font-weight: bold;
}

.body {
  background: #202020;
  color: #d7d7d7;
}

.black {
  color: #2f2f2f;
}
.bg-black {
  background: #2f2f2f;
}

.red {
  color: #d75f5f;
}
.bg-red {
  background: #d75f5f;
}

.green {
  color: #7eecb7;
}
.bg-green {
  background: #7eecb7;
}

.yellow {
  color: #af865a;
}
.bg-yellow {
  background: #af865a;
}

.blue {
  color: #535c5c;
}
.bg-blue {
  background: #535c5c;
}

.purple {
  color: #775759;
}
.bg-purple {
  background: #775759;
}

.cyan {
  color: #5e8d87;
}
.bg-cyan {
  background: #5e8d87;
}

.white {
  color: #a7a7a7;
}
.bg-white {
  background: #a7a7a7;
}

`

const render = ({ title, body, css = defaultCss } = {}) => template(title, css, body)

export default render
