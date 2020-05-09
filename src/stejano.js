var Jimp = require('jimp');

function conceal(msg, img, callback) {

  console.log("msg is: " + msg);
  console.log("img is: " + img);

  Jimp.read(img)
    .then(image => {
      console.log("max msg length allowed: " + maxMsgSize(image.bitmap.width, image.bitmap.height));
      console.log(image.bitmap.data.length);
      callback(true);
    })
    .catch(err => {
      console.log("there was an error", error);
    });
}

function maxMsgSize(width, height) {
  return (width * height * 3 / 8);
}

module.exports = conceal;
