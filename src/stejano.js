var Jimp = require('jimp');

function conceal(msg, img, callback) {
  Jimp.read(img)
    .then(image => {
      concealMsg(msg, image.bitmap.data);
      let ext = image.getExtension();
      image.write('image.concealed.' + ext);
      callback(true);
    })
    .catch(err => {
      console.log("there was an error concealing:", err);
    });
}

function concealMsg(msg, bitmap) {
  msg += "9@@z";
  let bits = asciiStrToBinary(msg);
  for (i = 0; i < bits.length; i++) {
    if (bits[i] == 1) {
      bitmap[i] = (bitmap[i] | 1);
    } else {
      bitmap[i] = (bitmap[i] & ~1);
    }
  }
}

function reveal(img, callback) {
  Jimp.read(img)
    .then(image => {
      let msg = revealMsg(image.bitmap);
      callback(msg);
    })
    .catch(err => {
      console.log("there was an error revealing:", err);
    });
}

function revealMsg(bitmap) {
  let bits = new Array();
  for (i = 0; i < bitmap.data.length; i++) {
    bits.push(bitmap.data[i] & 1);
  }
  let msg = binaryToAsciiStr(bits);
  msg = msg.substring(0, msg.search("9@@z"));
  return msg;
}

function maxMsgSize(width, height) {
  return (width * height / 2);
}

function asciiStrToBinary(str) {
  let binaryOfString = new Array();
  let binaryOfChar = new Array();
  for (i = 0; i < str.length; i++) {
    let asciiCodeForChar = str.charCodeAt(i);
    for (j = 0; j < 8; j++) {
      binaryOfChar.unshift((asciiCodeForChar & 1));
      asciiCodeForChar = asciiCodeForChar >> 1;
    }
    binaryOfString = binaryOfString.concat(binaryOfChar);
    binaryOfChar.length = 0;
  }
  return binaryOfString;
}

function binaryToAsciiStr(bin) {
  let str = "";
  for (i = 0; i < bin.length; i += 8) {
    let charBinaryStr = "";
    for (j = 0; j < 8; j++) {
      charBinaryStr += bin[i + j];
    }
    str += String.fromCharCode(parseInt(charBinaryStr, 2));
  }
  return str;
}

module.exports = {
  conceal: conceal,
  reveal: reveal
};
