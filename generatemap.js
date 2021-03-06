const fs          = require('fs');
const Handlebars  = require('handlebars');
const Koa         = require('koa');
const serve       = require('koa-static');
const puppeteer   = require('puppeteer');
const wkt         = require('terraformer-wkt-parser');
const md5         = require('md5');


async function generateMapImage(featureWkt) {
  const hash = md5(featureWkt);
  const mapData = wkt.parse(featureWkt);
  
  if (fs.existsSync(`export/${hash}.png`)) {
    return(`export/${hash}.png`);
  }
  
  const app = new Koa();
  
  app.use(serve('node_modules/leaflet/dist'))
  app.use( async ctx => {
    const template = Handlebars.compile(fs.readFileSync('views/map.hbs', 'utf8'));
    ctx.body = template({
      mapData: JSON.stringify(mapData)
    })
  });
  
  const server = app.listen(3005);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3005');
  await page.screenshot({path: `export/${hash}.png`});
  await browser.close();
  server.close();

  return `export/${hash}.png`;
}

module.exports = generateMapImage;