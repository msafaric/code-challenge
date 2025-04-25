import { isUppercaseLetter } from './index.js';

describe('isUppercaseLetter', () => {
  test('the function returns true if it is an uppercase letter', () => {
    expect(isUppercaseLetter('A')).toBe(true);
    expect(isUppercaseLetter('L')).toBe(true);
  });

  test('the function returns false if it is an lowercase letter', () => {
    expect(isUppercaseLetter('c')).toBe(false);
    expect(isUppercaseLetter('v')).toBe(false);
  });

  test('the function returns false if it is an empty string', () => {
    expect(isUppercaseLetter('')).toBe(false);
  });

  test('the function returns false if it is some other character', () => {
    expect(isUppercaseLetter('?')).toBe(false);
    expect(isUppercaseLetter('@')).toBe(false);
    expect(isUppercaseLetter('/')).toBe(false);
    expect(isUppercaseLetter(' ')).toBe(false);
    expect(isUppercaseLetter('#')).toBe(false);
  });

  test('the function returns false for letters from other alphabets', () => {
    expect(isUppercaseLetter('Ž')).toBe(false);
    expect(isUppercaseLetter('Š')).toBe(false);
    expect(isUppercaseLetter('Ć')).toBe(false);
    expect(isUppercaseLetter('č')).toBe(false);
    expect(isUppercaseLetter('Đ')).toBe(false);
  });
});
