const generateImage  = require('./generatemap');

wkt = process.argv[2];

(async () => {
  let imageUri = await generateImage(wkt);
  console.log(imageUri);
})();
