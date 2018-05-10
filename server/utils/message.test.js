var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let resultObject = generateMessage('Test Owner', 'Test text');

    expect(resultObject.from).toBe('Test Owner');
    expect(resultObject.text).toBe('Test text');
    expect(resultObject.createdAt).toBeDefined();
  })
})

describe('generateLocationMessage', () => {
  it('should generate location url', ()=> {
    let long = 19.9699141;
    let lat = 50.0961733;
    let resultObject = generateLocationMessage('testOwner', lat, long);

    expect(resultObject.from).toBe('testOwner');
    expect(resultObject.url).toBeTruthy();
    expect(resultObject.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
  })
})