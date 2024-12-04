const text = await Deno.readTextFile("Input.txt");
const splitData = text.split("\n").map((e) => e.split(""));

let sum = 0;

for (let i = 1; i < splitData.length - 1; i++) {
  for (let j = 1; j < splitData[i].length - 1; j++) {
    if (splitData[i][j] === "A") {
      const mas1 = splitData[i - 1][j - 1] + splitData[i][j] +
        splitData[i + 1][j + 1];
      const mas2 = splitData[i - 1][j + 1] + splitData[i][j] +
        splitData[i + 1][j - 1];

      if (
        (mas1 === "MAS" || mas1 === "SAM") &&
        (mas2 === "MAS" || mas2 === "SAM")
      ) {
        sum += 1;
      }
    }
  }
}

console.log("Sum of all occurrences:", sum);
