const matrix = [
  ['@', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['|', ' ', '+', '-', 'C', '-', '-', '+', ' ', ' '],
  ['A', ' ', '|', ' ', ' ', ' ', ' ', '|', ' ', ' '],
  ['+', '-', '-', '-', 'B', '-', '-', '+', ' ', ' '],
  [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
  [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
  [' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
];

function isUppercaseLetter(letter) {
  return /^[A-Z]$/.test(letter);
}

function isValidCharacter(character) {
  const possibleCharacter = ['+', '-', '|'];
  if (
    (character && isUppercaseLetter(character)) ||
    (possibleCharacter.includes(character) &&
      character !== ' ' &&
      character !== undefined)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkMatrixValidation(matrix) {
  let atCharacters = [];
  let xCharacters = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let z = 0; z < matrix[i].length; z++) {
      const character = matrix[i][z];
      if (character === '@') {
        atCharacters.push(character);
      }
      if (character === 'x') {
        xCharacters.push(character);
      }

      if (
        character !== '@' &&
        character !== 'x' &&
        character !== ' ' &&
        isValidCharacter(character) !== true
      ) {
        throw new Error(`Invalid character "${character}" in input matrix.`);
      }
    }
  }

  if (atCharacters.length > 1) {
    throw new Error('Invalid input matrix, too many @ chacaters.');
  }

  if (atCharacters.length === 0) {
    throw new Error('Invalid input matrix, matrix without starting character.');
  }

  if (xCharacters.length === 0) {
    throw new Error('Invalid input matrix, matrix without x character.');
  }
}

checkMatrixValidation(matrix);


export { isUppercaseLetter, isValidCharacter, checkMatrixValidation };
