const text = await Deno.readTextFile("Input.txt");

let list1: number[] = [];
let list2: number[] = [];
const parsedData = text.split("\n").forEach((line) => {
  let curr = line.split("   ").map((a) => Number(a));
  list1.push(curr[0]);
  list2.push(curr[1]);
});

let result = list1.reduce((prev, curr, i) => {
  return prev + curr * list2.reduce((acc, curr2) => {
    if (curr === curr2) {
      return acc + 1;
    }
    return acc + 0;
  }, 0);
}, 0);

console.log(result);
