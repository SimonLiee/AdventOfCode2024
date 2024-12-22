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

const sequenceMap: Map<string, number> = new Map();

secretNums.forEach((secretNum) => {
  const prices: number[] = [secretNum % 10];
  for (let i = 0; i < 2000; i++) {
    secretNum = nextSecretNum(secretNum);
    prices.push(secretNum % 10);
  }

  const secretNumsDiff = prices.map((price, i) => (i === 0 ? 0 : price - prices[i - 1])).slice(1);

  const thisSequenceMap: Map<string, number> = new Map();
  for (let i = 3; i < secretNumsDiff.length; i++) {
    const sequence = [secretNumsDiff[i - 3], secretNumsDiff[i - 2], secretNumsDiff[i - 1], secretNumsDiff[i]].toString();
    if (!thisSequenceMap.has(sequence)) {
      thisSequenceMap.set(sequence, prices[i + 1]);
    }
  }

  thisSequenceMap.forEach((value, key) => {
    sequenceMap.set(key, (sequenceMap.get(key) || 0) + value);
  });
});

function highestValue(map: Map<string, number>):  number {
  return map.entries().reduce((max, entry) => (entry[1] > max ? entry[1] : max), 0);
}

console.log(highestValue(sequenceMap));
