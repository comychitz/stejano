const stejano = require('../src/stejano.js');
const fs = require('fs');

test('basic conceal test', done => {
  function callback(data) {
    try {
      expect(data).toBe(true);
      fs.unlinkSync("./image.concealed.png"); 
      done();
    } catch (error) {
      done(error);
    }
  }
  stejano.conceal('this is a test', './test-files/image.png', callback);
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
