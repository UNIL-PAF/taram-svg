# paf-analysis-svg
Node server which creates SVG files from echart plots

## Configuration
Either adapt configuration in config.js or create your own my_config.js in the same directory.

## Installation
yarn install

(you can also use npm of course)

## Usage

# Start dev server
 supervisor app.js

# Example of a request
 curl -X POST localhost:3000/svg -d @test_obj.json -H "Content-Type: application/json"
 
