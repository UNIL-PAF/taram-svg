const fs = require('fs')
const echarts = require('echarts');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit')
const {createCanvas} = require('canvas')

echarts.setPlatformAPI({createCanvas})

const jsonParsing = function(key, value) {
    if (typeof value === "string" &&
        value.startsWith("/Function(") &&
        value.length <= 200 &&
        value.endsWith(")/")) {
        value = value.substring(10, value.length - 2);
        return (0, eval)("(" + value + ")");
    }
    return value;
}

const svgToPdf = (svgString, pdfPath) => {
  var doc = new PDFDocument({size: [550,250],
        margins : {
            top: 10,
           bottom:10,
            left: 10,
          right: 10
        }})
  outStream = fs.createWriteStream(pdfPath)
  SVGtoPDF(doc, svgString, 0, 0);
  doc.pipe(outStream);
  doc.end();
  return outStream
}

const createSvg = (options) => {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: options.width || 1440,
    height: options.height || 720
  });

  const echartsOptions = JSON.parse(options.echartsOptions, jsonParsing);

  // remove any animations
  chart.setOption({...echartsOptions, animation: false});
  return chart.renderToSVGString()
}

const createPng = (options) => {
    const canvas = createCanvas(options.width || 1440 , options.height || 720);
// ECharts can use the Canvas instance created by node-canvas as a container directly
    const chart = echarts.init(canvas);

    const echartsOptions = JSON.parse(options.echartsOptions, jsonParsing)
    chart.setOption({...echartsOptions, animation: false});

    return canvas
}

exports.createSvg = createSvg
exports.createPng = createPng
exports.svgToPdf = svgToPdf
