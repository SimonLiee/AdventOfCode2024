const text = await Deno.readTextFile("Input.txt");

const parsedData = text.split("\n").map((line) =>
  line.split(" ").map((a) => Number(a))
);

function checkReport(report: number[]) {
  // Check if numbers are consecutive
  return (report.every((elem, i) =>
    elem == report.toSorted((a, b) => a > b ? 1 : -1)[i]
  ) ||
    report.every((elem, i) =>
      elem == report.toSorted((a, b) => a > b ? 1 : -1).reverse()[i]
    )) &&
    // Check if the difference between consecutive number is not between 1-3
    report.every((elem, i) =>
      i == 0 ||
      Math.abs(elem - report[i - 1]) > 0 &&
        Math.abs(elem - report[i - 1]) <= 3
    );
}

// Remove every report that is not incresing or decreasing
// or the difference between consecutive number is not between 1-3
const result = parsedData.filter(checkReport);

console.log(result.length);
