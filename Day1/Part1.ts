const text = await Deno.readTextFile("Input.txt");

let list1: number[] = [];
let list2: number[] = [];
const parsedData = text.split("\n").forEach((line) => {
  let curr = line.split("   ").map((a) => Number(a));
  list1.push(curr[0]);
  list2.push(curr[1]);
});

list1.sort()
list2.sort()

let result = list1.reduce((prev, curr, i)=>{
  return prev + Math.abs(curr - list2[i]);
}, 0)

console.log(result);
