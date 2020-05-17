import { read } from 'jimp';

const secret = "9@@z";

function conceal(msg, srcImg, destImg) {
  return new Promise((resolved, rejected) => {
    read(srcImg)
      .then(img => {
        concealMsg(msg, img.bitmap.data);
        img.write(destImg);
        resolved();
      })
      .catch(err => {
        rejected(err);
      });
  });
}

function reveal(img) {
  return new Promise((resolved, rejected) => {
    read(img)
      .then(image => {
        const msg = revealMsg(image.bitmap);
        resolved(msg);
      })
      .catch(err => {
        rejected(err);
      });
  });
}

function concealMsg(msg, bitmap) {
  msg += secret;
  let bits = asciiStrToBinary(msg);
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] == 1) {
      bitmap[i] = (bitmap[i] | 1);
    } else {
      bitmap[i] = (bitmap[i] & ~1);
    }
  }
}

function revealMsg(bitmap) {
  let bits = new Array();
  for (let i = 0; i < bitmap.data.length; i++) {
    bits.push(bitmap.data[i] & 1);
  }
  let msg = binaryToAsciiStr(bits);
  msg = msg.substring(0, msg.search(secret));
  return msg;
}

function maxMsgSize(width, height) {
  return (width * height / 2);
}

function asciiStrToBinary(str) {
  let binaryOfString = new Array();
  let binaryOfChar = new Array();
  for (let i = 0; i < str.length; i++) {
    let asciiCodeForChar = str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
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
  for (let i = 0; i < bin.length; i += 8) {
    let charBinaryStr = "";
    for (let j = 0; j < 8; j++) {
      charBinaryStr += bin[i + j];
    }
    str += String.fromCharCode(parseInt(charBinaryStr, 2));
  }
  return str;
}

export { conceal, reveal };
