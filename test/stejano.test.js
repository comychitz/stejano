const stejano = require('../src/stejano.js');
const fs = require('fs');

test('basic conceal test', done => {
  const srcImg = "./test-files/image.png";
  const destImg = "./image.concealed.png";
  function callback(data) {
    try {
      expect(data).toBe(true);
      fs.unlinkSync(destImg);
      done();
    } catch (error) {
      done(error);
    }
  }
  const msg = "this is a test";
  stejano.conceal(msg, srcImg, destImg, callback);
});

test('basic reveal test', done => {
  function callback(revealedMsg) {
    try {
      expect(revealedMsg).toBe("this is a test");
      done();
    } catch (error) {
      done(error);
    }
  }
  stejano.reveal('./test-files/image.concealed.png', callback);
})
