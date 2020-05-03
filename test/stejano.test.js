const conceal = require('../src/stejano.js');

test('basic test', done => {
  function callback(data) {
    try {
      expect(data).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  }

    //let result = await conceal('msg', './test-files/image.jpg');
    //expect(result).toBe(true);
    //expect(conceal('msg', './test-files/image.jpg')).toBe(true);
    conceal('msg', './test-files/image.jpg', callback);
});
