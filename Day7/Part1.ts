const text = await Deno.readTextFile("Input.txt");
const equations: [number, number[]][] = text.split("\n").map((line) => {
  const splitLine = line.split(": ");
  return [
    Number(splitLine[0]),
    splitLine[1].split(" ").map((num) => Number(num)),
  ];
});

function calc(testValue: number, nums: number[], currSum: number) {
  if (nums.length === 0) {
    if (currSum === testValue) {
      return testValue;
    }
    return 0;
  }

  nums = [...nums];
  const num = nums.shift() as number;

  let ret = 0;
  ret = calc(testValue, nums, currSum + num);
  if (ret > 0) return ret;
  ret = calc(testValue, nums, currSum * num);
  if (ret > 0) return ret;

  return 0;
}

const result = equations.reduce((acc, curr) => {
  const first = curr[1].shift() as number;
  const num = calc(curr[0], curr[1], first);
  return acc + num;
}, 0);

console.log(result);
