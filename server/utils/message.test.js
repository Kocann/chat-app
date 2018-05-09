var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  
  it('should generate the correct message object', () => {
    let resultObject = generateMessage('Test Owner', 'Test text');

    expect(resultObject.from).toBe('Test Owner');
    expect(resultObject.text).toBe('Test text');
    expect(resultObject.createdAt).toBeGreaterThan(0);
  })

})