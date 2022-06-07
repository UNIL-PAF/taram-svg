const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
let config;

try {
  if (fs.existsSync('./my_config.js')) {
    config = require('./my_config')
  }else{
    config = require("./config")
  }
} catch(err) {
  console.error(err)
}

const app = express()
app.use(bodyParser.json());

/*
Structure of the request body:
{
  outputPath: "34/54",
  echartsOptions: {...}
  height: 300,
  width: 500
}
*/

app.post('/svg', (req, res) => {
  console.log(req.body)
  const outputPath = req.body.outputPath

  res.type('text/plain')
  res.send(outputPath + '/' + config.fileName)
})

app.get('/version', (req, res) => {
    res.type('text/plain')
    res.send(config.version)
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 Not found')
})

app.listen(config.port, () => console.log(`PAF analysis SVG is on Port ${config.port} Ctrl + C to Stop `))
