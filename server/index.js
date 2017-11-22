const express = require('express')
const app = express()
 const RE = require('./resetData')
const api = require('./api')
// api启用
api(app)

// 数据刷新
 // RE() 
app.listen(8889)