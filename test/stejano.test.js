const stejano = require('../src/stejano.js');
const fs = require('fs');

test('basic conceal test', done => {
  const msg = "this is a test";
  const srcImg = "./test-files/image.png";
  const destImg = "./image.concealed.png";

  stejano.conceal(msg, srcImg, destImg)
    .then(() => {
      fs.unlinkSync(destImg);
      done()
    })
    .catch(error => {
      done(error)
    });
});

test('basic reveal test', done => {
  const img = "./test-files/image.concealed.png";
  stejano.reveal(img)
    .then(revealedMsg => {
      expect(revealedMsg).toBe("this is a test");
      done();
    })
    .catch(err => {
      done(err);
    });
})
