const text = await Deno.readTextFile("Input.txt");
const equations: [number, number[]][] = text.split("\n").map((line) => {
  const splitLine = line.split(": ");
  return [
    Number(splitLine[0]),
    splitLine[1].split(" ").map((num) => Number(num)),
  ];
});

function calc(
  testValue: number,
  nums: number[],
  index: number,
  currSum: number,
) {
  if (currSum > testValue) {
    return 0;
  }
  if (index >= nums.length) {
    if (currSum === testValue) {
      return testValue;
    }
    return 0;
  }

  const num = nums[index];

  let ret = 0;
  ret = calc(testValue, nums, index + 1, currSum + num);
  if (ret > 0) return ret;
  ret = calc(testValue, nums, index + 1, currSum * num);
  if (ret > 0) return ret;
  ret = calc(
    testValue,
    nums,
    index + 1,
    Number(currSum.toString() + num.toString()),
  );
  if (ret > 0) return ret;

  return 0;
}

const result = equations.reduce((acc, curr) => {
  const first = curr[1].shift() as number;
  return acc + calc(curr[0], curr[1], 0, first);
}, 0);

console.log(result);
