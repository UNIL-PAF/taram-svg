# taram-svg

A simple NodeJS server which creates SVG files from [EChart](https://echarts.apache.org/en/index.html) plots.

This project is part of [Taram](https://github.com/UNIL-PAF/taram-backend).

## Configuration
Either adapt configuration in `config.js` or create your own `my_config.js` in the same directory.

## Installation
`yarn install`

## Usage

### Start dev server
 `supervisor app.js`

### Example of a request
 `curl -X POST localhost:3000/svg -d @test_obj.json -H "Content-Type: application/json"`
