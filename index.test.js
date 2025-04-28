import { isUppercaseLetter, isValidCharacter, validateMatrix, getNextCharacter, findDirectionAtIntersection, findDirectionAtUppercaseLetter, walkingThroughTheMatrix, getMatrixPath } from './index.js';

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

describe('isValidCharacter', () => {
  test('function returns true for valid input character', () => {
    expect(isValidCharacter('+')).toBe(true);
    expect(isValidCharacter('-')).toBe(true);
    expect(isValidCharacter('|')).toBe(true);
    expect(isValidCharacter('B')).toBe(true);
    expect(isValidCharacter('G')).toBe(true);
  });

  test('function returns for for invalid input character', () => {
    expect(isValidCharacter(' ')).toBe(false);
    expect(isValidCharacter('x')).toBe(false);
    expect(isValidCharacter('@')).toBe(false);
  });
});

describe('validateMatrix', () => {
  it('function returns an error if starting character "@" is missing', () => {
    const matrix = [
      [' ', ' ', ' ', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    expect(() => validateMatrix(matrix)).toThrow('Invalid input matrix, matrix without starting character.');
  });
});

describe('findDirectionAtIntersection', () => {
  test('function returns an error if matrix has broken path', () => {
    const matrix = [
      ['@', '-', '+'],
      [' '],
      ['-', '-', 'x'],
    ];
    const position = { row: 0, column: 2 };
    expect(() => findDirectionAtIntersection(matrix, position, 'right')).toThrow('Broken path');
  });
});

describe('findDirectionAtUppercaseLetter', () => {
  test('function changes direction if it cannot continue in the current direction', () => {
    const matrix = [
      ['@', '-', 'C'],
      ['G', ' ', '|', ' '],
      ['-', 'F', 'x'],
    ];
    const direction = 'right';
    const position = { row: 0, column: 2 };
    expect(findDirectionAtUppercaseLetter(matrix, position, direction)).toBe('down');
  });
});

describe('getNextCharacter', () => {
  test('function returns correct character based on the input direction', () => {
    const matrix = [
      ['|', 'C'],
      ['@', '-', '+'],
      ['|', 'D'],
      ['x', '-'],
    ];
    const position = { row: 1, column: 0 };
    expect(getNextCharacter(matrix, position, 'right')).toBe('-');
    expect(getNextCharacter(matrix, position, 'down')).toBe('|');
  });
});


describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const expected = {
      letters: 'ACB',
      pathAsCharacters: '@---A---+|C|+---+|+-B-x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      ['@'],
      ['|', ' ', '+', '-', 'C', '-', '-', '+'],
      ['A', ' ', '|', ' ', ' ', ' ', ' ', '|'],
      ['+', '-', '-', '-', 'B', '-', '-', '+'],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
      [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
    ];

    const expected = {
      letters: 'ABCD',
      pathAsCharacters: '@|A+---B--+|+--C-+|-||+---D--+|x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      [' ', '+', '-', 'L', '-', '+'],
      [' ', '|', ' ', ' ', '+', 'A', '-', '+'],
      ['@', 'B', '+', ' ', '+', '+', ' ', 'H'],
      [' ', '+', '+', ' ', ' ', ' ', ' ', 'x'],
    ];

    const expected = {
      letters: 'BLAH',
      pathAsCharacters: '@B+++B|+-L-+A+++A-+Hx'
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
      letters: 'GOONIES',
      pathAsCharacters: '@-G-O-+|+-+|O||+-O-N +|I|+-+|+-I-+|ES|x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('walkingThroughTheMatrix', () => {
  test('walkingThroughTheMatrix function returns correct letters and correct walking distance', () => {
    const matrix = [
      ["@", "-", "A", "-", "-", "+"],
      [" ", " ", " ", " ", " ", "|"],
      [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"]
    ]

    const expected = {
      letters: 'AB',
      pathAsCharacters: '@-A--+|+-B--x'
    };

    const result = walkingThroughTheMatrix(matrix);

    expect(result).toEqual(expected);
  });
});

describe('getMatrixPath', () => {
  test('funtion returns correct result for a valid 2-dimensional matrix', () => {
    const matrix = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const expected = {
      letters: 'ACB',
      pathAsCharacters: '@---A---+|C|+---+|+-B-x'
    };

    expect(getMatrixPath(matrix)).toEqual(expected);
  });

  test('function returns an error if matrix detected fork in the path', () => {
    const matrix = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', '-', 'B'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['@', '-', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', 'x', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const result = getMatrixPath(matrix);

    expect(result).toHaveProperty('error');
    expect(result.error).toBe('Fork in path');
  });


  test('function return error if input is not 2-dimensional matrix', () => {
    const matrix = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      3,
    ];

    const result = getMatrixPath(matrix);

    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/must be a 2-dimensional array/i);
  });

  test('function returns an error if the matrix does not have a starting position', () => {
    const matrix = [
      [' ', '-', '-', '-', 'A', '-', '-', '-', '+'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
      ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
      [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
      [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
    ];

    const result = getMatrixPath(matrix);

    expect(result).toHaveProperty('error');
    expect(result.error).toMatch(/without starting character/);
  });

  test('funtion returns correct result - object of collected letters and the correct traveled path', () => {
    const matrix = [
      ["@", "-", "A", "-", "-", "+"],
      [" ", " ", " ", " ", " ", "|"],
      [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"]
    ]
    const result = getMatrixPath(matrix);
    expect(result.letters).toBe('AB');
    expect(result.pathAsCharacters).toBe('@-A--+|+-B--x');
  });


  test('function returns an error for invalid input matrix - fake turn case', () => {
    const matrix = [["@", "-", "A", "-", "+", "-", "B", "-", "x"],]
    const result = getMatrixPath(matrix);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe('Fake turn');
  });
});