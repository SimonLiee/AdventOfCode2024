const text = await Deno.readTextFile("Input.txt");
const secretNums: number[] = text.split("\n").map(Number);

function mix(num1: number, num2: number): number {
  return (num1 ^ num2) >>> 0;
}

function prune(num: number): number {
  return num % 16777216;
}

function nextSecretNum(secretNum: number): number {
  secretNum = prune(mix(secretNum * 64, secretNum));
  secretNum = prune(mix(Math.floor(secretNum / 32), secretNum));
  secretNum = prune(mix(secretNum * 2048, secretNum));
  return secretNum;
}

const result = secretNums.map(secretNum => {
  for (let i = 0; i < 2000; i++) {
    secretNum = nextSecretNum(secretNum);
  }
  return secretNum;
}).reduce((acc, curr) => acc + curr, 0);

console.log(result);
