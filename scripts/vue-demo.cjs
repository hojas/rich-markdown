const path = require('node:path')
const shell = require('shelljs')

const dir = path.resolve(__dirname, '../packages/vue-demo/')

shell.cd(dir)
shell.exec('pnpm dev')
