// Definir el sudoku (9x9)
const sudoku = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

// Función para verificar si todas las filas y columnas suman igual
function verificarSudoku(sudoku) {
  const sumaEsperada = 45; // La suma de los números del 1 al 9

  // Verificar filas
  for (let i = 0; i < 9; i++) {
    const fila = sudoku[i];
    const sumaFila = fila.reduce((a, b) => a + b, 0);
    if (sumaFila !== sumaEsperada) {
      return false;
    }
  }

  // Verificar columnas
  for (let j = 0; j < 9; j++) {
    let sumaColumna = 0;
    for (let i = 0; i < 9; i++) {
      sumaColumna += sudoku[i][j];
    }
    if (sumaColumna !== sumaEsperada) {
      return false;
    }
  }

  return true;
}

// Llamar a la función para verificar el sudoku
if (verificarSudoku(sudoku)) {
  console.log("El sudoku es válido.");
} else {
  console.log("El sudoku no es válido.");
}
