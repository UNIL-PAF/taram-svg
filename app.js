const express = require('express')
const bodyParser = require('body-parser')
const plot = require('./plot')
const fs = require('fs')

const version = "1.0.0"

/*
  Load 'my_config.js' if it's available
*/
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
  height: 300, //default is 300
  width: 500  // default is 500
}
*/

app.post('/pdf', (req, res) => {
  const pdfPath = req.body.outputPath + '/' + config.fileName + '.pdf'
  const svgString = plot.createSvg(req.body)
  plot.svgToPdf(svgString, config.rootPath + pdfPath)
  res.type('text/plain')
  res.send(pdfPath)
})


app.post('/svg', (req, res) => {
  const svgPath = req.body.outputPath + '/' + config.fileName + '.svg'
  const svgString = plot.createSvg(req.body)
  fs.writeFileSync(config.rootPath + svgPath, svgString, 'utf-8');
  res.type('text/plain')
  res.send(svgPath)
})

app.get('/version', (req, res) => {
    res.type('text/plain')
    res.send(version)
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 Not found')
})

app.listen(config.port, () => console.log(`PAF analysis SVG is on Port ${config.port} Ctrl + C to Stop `))
