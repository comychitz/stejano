
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
  }
  return binaryOfString;
}
