var Jimp = require('jimp');

function conceal(msg, img, callback) {

  console.log("msg is: " + msg);
  console.log("img is: " + img);

  Jimp.read(img)
    .then(image => {
      console.log(JSON.stringify(image));
      console.log(image.bitmap.data.length);
      callback(true);
    })
    .catch(err => {
      console.log("there was an error", error);
    });

}

module.exports = conceal;
