const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', ()=>{
  it('should return false for string with just spaces', () => {
    let str = '      ';
    expect(isRealString(str)).toBeFalsy();
  })

  it('should reject non string values', () => {
    let str = 15758;
    expect(isRealString(str)).toBeFalsy();
  })

  it('should allow string with non space chars', () => {
    let str="gfgfgf   ";
    expect(isRealString(str)).toBeTruthy();
  })
})