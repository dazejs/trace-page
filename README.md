# trace-page
a trace page for nodejs error
<div align="center">
  <img src="https://github.com/dazejs/trace-page/blob/master/page.png" style="width: 100%;">
</div>

# Installation
```sh
$ npm install --save @dazejs/trace-page
```

# Usage
```js
const tracePage = require('@dazejs/trace-page')

async function (ctx next) {
  try {
    await next()
  } catch (err) {
    return tracePage(err, ctx, [options])
  }
}
```
### options
- `options.logo`: `render` String in html, ex: `<span>Daze.js</span>`
- `more...`

