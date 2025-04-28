// const matrix = [
//   [' ', ' ', ' ', ' ', '+', '-', 'O', '-', 'N', ' ', '+', ' ', ' '],
//   [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', '|', ' ', ' '],
//   [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '+', '-', 'I', '-', '+'],
//   ['@', '-', 'G', '-', 'O', '-', '+', ' ', '|', ' ', '|', ' ', '|'],
//   [' ', ' ', ' ', ' ', '|', ' ', '|', ' ', '+', '-', '+', ' ', 'E'],
//   [' ', ' ', ' ', ' ', '+', '-', '+', ' ', ' ', ' ', ' ', ' ', 'S'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
// ];

// const matrix = [
//   [' ', '+', '-', 'L', '-', '+'],
//   [' ', '|', ' ', ' ', '+', 'A', '-', '+'],
//   ['@', 'B', '+', ' ', '+', '+', ' ', 'H'],
//   [' ', '+', '+', ' ', ' ', ' ', ' ', 'x'],
// ];

// const matrix = [
//   ['@'],
//   ['|', ' ', '+', '-', 'C', '-', '-', '+'],
//   ['A', ' ', '|', ' ', ' ', ' ', ' ', '|'],
//   ['+', '-', '-', '-', 'B', '-', '-', '+'],
//   [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', 'x'],
//   [' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//   [' ', ' ', '+', '-', '-', '-', 'D', '-', '-', '+'],
// ];

// const matrix = [
//   ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
//   ['x', '-', 'B', '-', '+', ' ', ' ', ' ', 'C'],
//   [' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|'],
//   [' ', ' ', ' ', ' ', '+', '-', '-', '-', '+'],
// ];

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
//   ["@", "-", "A", "-", "-", "+"],
//   [" ", " ", " ", " ", " ", "|"],
//   [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"]
// ]


// const matrix = [
//   ["@", "-", "A", "-", "+", "-", "B", "-", "x"],
// ]

const matrix = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]]

const possibleDirections = {
  right: { row: 0, column: 1 },
  down: { row: 1, column: 0 },
  left: { row: 0, column: -1 },
  up: { row: -1, column: 0 },
};

export function isUppercaseLetter(letter) {
  return /^[A-Z]$/.test(letter);
}

export function isValidCharacter(character) {
  const possibleCharacters = ['+', '-', '|'];
  if (
    (character && isUppercaseLetter(character)) ||
    (possibleCharacters.includes(character) &&
      character !== undefined)
  ) {
    return true;
  } else {
    return false;
  }
}

export function validateMatrix(matrix) {
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
    throw new Error('Invalid input matrix, too many @ characters.');
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

export function getNextCharacter(matrix, position, direction) {
  const step = possibleDirections[direction];
  const nextRowPosition = position.row + step.row;
  const nextColumnPosition = position.column + step.column;
  return matrix[nextRowPosition]?.[nextColumnPosition];
}

export function getValidDirections(matrix, position, currentDirection) {
  let validDirections = [];

  for (const direction in possibleDirections) {
    if (direction === currentDirection) {
      continue;
    }

    const character = getNextCharacter(matrix, position, direction);

    if (isValidCharacter(character) || isUppercaseLetter(character) || character === "x") {
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
    const firstSide = getNextCharacter(matrix, position, validDirections[0])
    const secondSide = getNextCharacter(matrix, position, validDirections[1])
    if (firstSide === secondSide) {
      throw new Error('Fork in path');
    }
  }

  if (currentDirection === validDirections[0]) {
    throw new Error('Fake turn');
  }

  return validDirections[0];
}

export function findDirectionAtUppercaseLetter(matrix, position, currentDirection) {
  const step = possibleDirections[currentDirection];
  let nextCharacter = matrix[position.row + step.row]?.[position.column + step.column];

  if (nextCharacter === 'x') {
    return currentDirection;
  }

  if (isValidCharacter(nextCharacter) || isUppercaseLetter(nextCharacter) || nextCharacter === ' ') {
    return currentDirection;
  }

  const opposite = getOppositeDirection(currentDirection);

  for (const direction in possibleDirections) {
    if (direction === currentDirection || direction === opposite) continue;

    const directionChange = possibleDirections[direction];
    nextCharacter = matrix[position.row + directionChange.row]?.[position.column + directionChange.column];

    if (nextCharacter === 'x') {
      return direction;
    }

    if (isValidCharacter(nextCharacter) || isUppercaseLetter(nextCharacter) || nextCharacter === ' ') {
      return direction;
    }
  }

  throw new Error('No valid directions');
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
      break
    }

    const currentChar = matrix[position.row][position.column];
    stepsProgress.push(currentChar);
    const letterWithCoordinates = `${currentChar} ${position.row} ${position.column}`;
    if (isUppercaseLetter(currentChar) && !foundLetters.includes(letterWithCoordinates)) {
      foundLetters.push(letterWithCoordinates);
    }
    if (isUppercaseLetter(currentChar)) {
      direction = findDirectionAtUppercaseLetter(matrix, position, direction);
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
    letters: foundLetters.map((element) => element[0]).join(''),
    pathAsCharacters: stepsProgress.join(''),
  };

  return result;
}

export function getMatrixPath(matrix) {
  try {
    const isValid = validateMatrix(matrix);

    if (isValid) {
      const result = walkingThroughTheMatrix(matrix);
      return result;
    }
  } catch (error) {
    return { error: error.message };
  }
}

console.log(getMatrixPath(matrix))




