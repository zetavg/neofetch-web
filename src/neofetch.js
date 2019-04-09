import os from 'os'
import shell from 'shelljs'

const Neofetch = {
  getHTML: ({ showUsername = false } = {}) => new Promise((resolve, reject) => {
    shell.exec(
      'neofetch | aha --no-header --stylesheet',
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0 || !stdout) {
          reject(stderr || 'Error: No output')
          return
        }

        let output = stdout
        const [logoAndHostname, infoText] = output.split(/[\n\r ]---+[\n\r ]/)
        if (infoText) {
          const [,
            logoPart,
            userNamePart1,
            userNamePart2,
            atSignPart,
            hostnamePart,
          ] = logoAndHostname.match(
            /(^[\s\S]*)(<span class="[^<>]*)(">[^<>]*<\/span>)(@)([\s\S]*$)/,
          )
          const usernameAndHost = (
            showUsername ? (
              userNamePart1 + userNamePart2 + atSignPart
            // eslint-disable-next-line prefer-template
            ) : ''
            + hostnamePart
          )
          output = (
            // eslint-disable-next-line prefer-template
            ''
            + `<div class="logo-block">${logoPart}<br /></div>`
            + '<div class="info-text-block">'
            + usernameAndHost
            + `<br /><span class="seperator">${'-'.repeat(usernameAndHost.replace(/<[^<>]*>/g, '').length)}</span>`
            + infoText
            + '<br /></div>'
          )
        }

        output = output.replace(/([\n\r>])([^<>]+)/g, (...[, p, t]) => p + t.replace(/ /g, '&nbsp;'))
        output = output.replace(/[\r\n]+/g, '<br />\n')
        output = output.replace('<span class="dimgray', '<br /><span class="dimgray')
        resolve(output)
      },
    )
  }),
  getHostname: async () => os.hostname(),
}

export default Neofetch
