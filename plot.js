const fs = require('fs')
const echarts = require('echarts');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit')
const {createCanvas} = require('canvas')

echarts.setPlatformAPI({createCanvas})

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
}

const createSvg = (options) => {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: options.width || 600,
    height: options.height || 300
  });

  const echartsOptions = JSON.parse(options.echartsOptions)

  // remove any animations
  chart.setOption({...echartsOptions, animation: false});
  return chart.renderToSVGString({opts: {useViewBox: true}})
}

const createPng = (options) => {
    const canvas = createCanvas(options.width || 1440 , options.height || 720);
// ECharts can use the Canvas instance created by node-canvas as a container directly
    const chart = echarts.init(canvas);

    const echartsOptions = JSON.parse(options.echartsOptions)
    chart.setOption({...echartsOptions, animation: false});

    return canvas
}

exports.createSvg = createSvg
exports.createPng = createPng
exports.svgToPdf = svgToPdf
