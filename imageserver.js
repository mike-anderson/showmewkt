const fs             = require('fs');
var Queue            = require('bull');
const Koa            = require('koa');
const Router         = require('koa-router');
const send           = require('koa-send');
const generateImage  = require('./generatemap');

const app = new Koa();
const router = new Router();
const imageQueue = new Queue('map generation');

imageQueue.process( async function (job) {
  let uri = await generateImage(job.data.wkt);
  return { uri };
});

router.get('/:wkt', async (ctx, next) => {
  let job = await imageQueue.add({wkt: ctx.params.wkt});
  let result = await job.finished();
  await send(ctx, result.uri);
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);