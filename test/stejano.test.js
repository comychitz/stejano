import { conceal, reveal } from '../src/stejano.js';
import { existsSync, unlinkSync } from 'fs';

test('basic conceal test', done => {
  const msg = "this is a test";
  const srcImg = "./test-files/image.png";
  const destImg = "/tmp/image.concealed.png";

  conceal(msg, srcImg, destImg)
    .then(() => {
      existsSync(destImg);
      unlinkSync(destImg);
      done()
    })
    .catch(error => {
      done(error)
    });
});

test('basic reveal test', done => {
  const img = "./test-files/image.concealed.png";
  reveal(img)
    .then(revealedMsg => {
      expect(revealedMsg).toBe("this is a test");
      done();
    })
    .catch(err => {
      done(err);
    });
})
