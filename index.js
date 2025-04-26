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

// const matrix = [
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', '-', 'B'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//   ['@', '-', '-', '-', '-', 'A', '-', '-', '-', '+'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//   [' ', ' ', ' ', ' ', 'x', '+', ' ', ' ', ' ', 'C'],
//   [' ', ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
//   [' ', ' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
// ];


// const matrix = [
//   ["@", "-", "A", "-", "+", "-", "B", "-", "x"],
// ]

// const matrix = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]]

export function isUppercaseLetter(letter) {
  return /^[A-Z]$/.test(letter);
}

export function isValidCharacter(character) {
  const possibleCharacter = ['+', '-', '|'];
  if (
    (character && isUppercaseLetter(character)) ||
    (possibleCharacter.includes(character) &&
      // character !== ' ' &&
      character !== undefined)
  ) {
    return true;
  } else {
    return false;
  }
}

export function checkMatrixValidation(matrix) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    !matrix.every(row => Array.isArray(row))
  ) {
    throw new Error('Invalid input matrix, it must be a 2-dimensional array.');
  }

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

  return true
}

export function findCharacterPosition(matrix, character) {
  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];
    for (let z = 0; z < row.length; z++) {
      if (row[z] === character) {
        return { row: i, column: z };
      }
    }
  }
  return null;
}

export function getValidDirections(matrix, position, currentDirection) {
  const possibleDirections = {
    right: { row: 0, column: 1 },
    down: { row: 1, column: 0 },
    left: { row: 0, column: -1 },
    up: { row: -1, column: 0 },
  };

  let validDirections = [];

  for (const direction in possibleDirections) {
    if (direction === currentDirection) {
      continue;
    }

    const step = possibleDirections[direction];
    const nextRowPosition = position.row + step.row;
    const nextColumnPosition = position.column + step.column;
    const character = matrix[nextRowPosition]?.[nextColumnPosition];

    if (isValidCharacter(character) || isUppercaseLetter(character)) {
      validDirections.push(direction);
    }
  }

  return validDirections;
}


export function findInitialDirection(matrix, position) {
  const validDirections = getValidDirections(matrix, position);

  if (validDirections.length === 0) {
    throw new Error('Invalid start direction');
  }

  if (validDirections.length > 1) {
    throw new Error('Multiple starting paths');
  }

  return validDirections[0];
}

export function getOppositeDirection(direction) {
  const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
  return opposites[direction];
}

export function findDirectionAtIntersection(matrix, position, currentDirection) {
  const oppositeDirection = getOppositeDirection(currentDirection);
  const validDirections = getValidDirections(matrix, position, oppositeDirection);

  if (validDirections.length === 0) {
    throw new Error('Broken path');
  }

  if (validDirections.length > 1) {
    throw new Error('Fork in path');
  }

  return validDirections[0];
}


export function walkingThroughTheMatrix(matrix) {
  let position = findCharacterPosition(matrix, '@');
  let direction = findInitialDirection(matrix, position);

  const foundLetters = [];
  const stepsProgress = [];

  const maxSteps = matrix.reduce((acc, row) => acc + row.length, 0);
  for (let i = 0; i < maxSteps; i++) {
    if (
      position.row < 0 ||
      position.row >= matrix.length ||
      position.column < 0 ||
      position.column >= matrix[position.row].length
    ) {
      throw new Error('Broken path');
    }

    const currentChar = matrix[position.row][position.column];
    stepsProgress.push(currentChar);

    const letterWithCoordinates = `${currentChar} ${position.row} ${position.column}`;
    if (
      isUppercaseLetter(currentChar) &&
      !foundLetters.includes(letterWithCoordinates)
    ) {
      foundLetters.push(letterWithCoordinates);
    }

    if (currentChar === '+') {
      direction = findDirectionAtIntersection(matrix, position, direction)
    }

    if (currentChar === 'x') {
      break;
    }

    if (direction === 'right') position.column++;
    if (direction === 'down') position.row++;
    if (direction === 'left') position.column--;
    if (direction === 'up') position.row--;
  }

  const result = {
    Letters: foundLetters.map((element) => element[0]).join(''),
    PathAsCharacters: stepsProgress.join(''),
  };

  return result;
}

export function getResult(matrix) {
  try {
    const isValid = checkMatrixValidation(matrix);

    if (isValid) {
      const result = walkingThroughTheMatrix(matrix);
      return result;
    }
  } catch (error) {
    return { error: error.message };
  }
}

console.log(getResult(matrix))




