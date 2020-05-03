const conceal = require('../src/stejano.js');

test('basic test', () => {
    expect(conceal('msg', 'image.jpeg')).toBe(true);
})
