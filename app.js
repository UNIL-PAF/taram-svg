const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const version = "0.1.0"

app.use(bodyParser.json());

app.post('/svg', (req, res) => {
  console.log(req.body)
  res.type('text/plain')
  res.send('blibla')
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

app.listen(port, () => console.log(`PAF analysis SVG is on Port ${port} Ctrl + C to Stop `))
