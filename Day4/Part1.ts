const text = await Deno.readTextFile("Input.txt");
const splitData = text.split("\n");

let sum = 0;

// Function to count occurrences of a pattern in a string
const countOccurrences = (str: string, pattern: RegExp) => {
  return [...str.matchAll(pattern)].length;
};

// Horizontal
splitData.forEach((row) => {
  sum += countOccurrences(row, /XMAS/g); // Left to right
  sum += countOccurrences(row.split("").reverse().join(""), /XMAS/g); // Right to left
});

// Vertical
for (let col = 0; col < splitData[0].length; col++) {
  const verticalString = splitData.map((row) => row[col]).join("");
  sum += countOccurrences(verticalString, /XMAS/g); // Top to bottom
  sum += countOccurrences(verticalString.split("").reverse().join(""), /XMAS/g); // Bottom to top
}

// Diagonals
const diagonals: string[] = [];

// Top-left to bottom-right diagonals
for (let i = 0; i < splitData.length; i++) {
  diagonals.push(
    splitData.map((_, j) => (i + j < splitData.length ? splitData[i + j][j] : null))
      .filter((e) => e != null).join("")
  );
}
for (let i = 1; i < splitData[0].length; i++) {
  diagonals.push(
    splitData.map((_, j) => (i + j < splitData[0].length ? splitData[j][i + j] : null))
      .filter((e) => e != null).join("")
  );
}

// Top-right to bottom-left diagonals
for (let i = 0; i < splitData.length; i++) {
  diagonals.push(
    splitData.map((_, j) => (i + j < splitData.length ? splitData[i + j][splitData[0].length - 1 - j] : null))
      .filter((e) => e != null).join("")
  );
}
for (let i = 1; i < splitData[0].length; i++) {
  diagonals.push(
    splitData.map((_, j) => (i + j < splitData[0].length ? splitData[j][splitData[0].length - 1 - (i + j)] : null))
      .filter((e) => e != null).join("")
  );
}

// Count occurrences in all diagonals
diagonals.forEach((diagonal) => {
  sum += countOccurrences(diagonal, /XMAS/g); // Normal diagonal
  sum += countOccurrences(diagonal.split("").reverse().join(""), /XMAS/g); // Reverse diagonal
});

console.log("Sum of all occurrences:", sum);
