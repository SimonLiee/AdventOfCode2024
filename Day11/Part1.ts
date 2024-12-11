const text = await Deno.readTextFile("Input.txt");
let stones: number[] = text.split(" ").map((elem) => Number(elem));

function blink() {
  const newStones: number[] = [];
  for (let i = 0; i < stones.length; i++) {
    if (Number(stones[i]) === 0) {
      newStones.push(1);
    } else if (stones[i].toString().length % 2 === 0) {
      const stringStone = stones[i].toString();
      // console.log(stones[i]);
      // console.log(stones[i].slice(0, stones[i].length / 2));
      // console.log(stones[i].slice(stones[i].length / 2, stones[i].length));
      const start = stringStone.slice(0, stringStone.length / 2);
      const end = stringStone.slice(stringStone.length / 2, stringStone.length);
      newStones.push(Number(start));
      newStones.push(Number(end));
    } else {
      newStones.push(stones[i] * 2024);
    }
  }
  stones = newStones;
}

for (let i = 0; i < 25; i++) {
  // console.log(stones);
  blink();
}

console.log(stones.length);
