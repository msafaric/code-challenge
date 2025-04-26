import { isUppercaseLetter, walkingThroughTheMatrix, getResult } from './index.js';

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


describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      ['@', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['|', ' ', '+', '-', 'C', '-', '-', '+', ' ', ' '],
      ['A', ' ', '|', ' ', ' ', ' ', ' ', '|', ' ', ' '],
      ['+', '-', '-', '-', 'B', '-', '-', '+', ' ', ' '],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
    ];

    const expected = {
      Letters: 'ABCD',
      PathAsCharacters: '@|A+---B--+|+--C-+|-||+---D--+|x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      [' ', ' ', ' ', ' ', '+', '-', 'O', '-', 'N', ' ', '+', ' ', ' '],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' '],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '+', '-', 'I', '-', '+'],
      ['@', '-', 'G', '-', 'O', '-', '+', ' ', '|', ' ', '|', ' ', '|'],
      [' ', ' ', ' ', ' ', '|', ' ', '|', ' ', '+', '-', '+', ' ', 'E'],
      [' ', ' ', ' ', ' ', '+', '-', '+', ' ', ' ', ' ', ' ', ' ', 'S'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
    ];

    const expected = {
      Letters: 'GOONIES',
      PathAsCharacters: '@-G-O-+|+-+|O||+-O-N +|I|+-+|+-I-+|ES|x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('getResult', () => {
  test('funtion returns correct result for a valid 2-dimensional matrix', () => {
    const matrix = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const expected = {
      Letters: 'ACB',
      PathAsCharacters: '@---A---+|C|+---+|+-B-x'
    };

    expect(getResult(matrix)).toEqual(expected);
  });

  test('function return error if input is not 2-dimensional matrix', () => {
    const matrix = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      3,
    ];

    const result = getResult(matrix);

    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/must be a 2-dimensional array/i);
  });

  test('function returns error if matrix is invalid', () => {
    const matrix = [
      [' ', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const result = getResult(matrix);

    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/starting character/);
  });
});