
const path = require('path')
const fs = require('fs')
const stackTrace = require('stack-trace')
const { promisify } = require('util')
const nunjucks = require('nunjucks')

const contextLinesNumber = 10
const WRITE_CONTENT_IN_LINE = Symbol('Trace#writeContentInLine')
const READ_FILE = Symbol('Trace#readFile')
const env = nunjucks.configure(path.resolve(__dirname, './dist/view'))

function cutFileName(name) {
  return name.length > 50 ? '...' + name.slice(-50) : file
}

class TracePage {
  render(err, request, options = {}) {
    const stacks = this.parse(err)
    return env.render('index.html', {
      stacks: stacks.filter(s => !!s),
      name: err.name,
      message: err.message,
      request: request,
      pid: process.pid,
      ppid: process.ppid,
      platform: process.platform,
      version: process.version,
      uptime: process.uptime(),
      cutFileName,
      options,
    })
  }

  get [READ_FILE]() {
    return promisify(fs.readFile)
  }

  parse(err) {
    const stacks = stackTrace.parse(err)
    return stacks.map(this[WRITE_CONTENT_IN_LINE])
  }

  [WRITE_CONTENT_IN_LINE](line) {
    const filename = line.getFileName()
    const lineNumber = line.getLineNumber()
    const data = fs.readFileSync(filename, { encoding: 'utf-8' })
    const startLine = Math.max(0, lineNumber - contextLinesNumber)
    const endLine = Math.min(lineNumber + contextLinesNumber, data.length)
    const contextLines = data.split('\n').slice(startLine, endLine)
    line.content = contextLines.join('\n')
    line.startLineNumber = Math.max(0, startLine) + 1
    return line
  }
}

module.exports = function (err, request, options) {
  return (new TracePage()).render(err, request, options)
}
