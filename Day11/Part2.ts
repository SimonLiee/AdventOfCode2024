const text = await Deno.readTextFile("Input.txt");
const stones: number[] = text.split(" ").map((elem) => Number(elem));

const memo: Map<string, number> = new Map();

function blink(stone: number, count: number) {
  if (memo.has(`${stone}, ${count}`)) {
    return memo.get(`${stone}, ${count}`)!;
  }
  
  if (count < 0) {
    return 1;
  }

  let ret = 0;

  if (stone === 0) {
    ret += blink(1, count - 1);
  } else if (stone.toString().length % 2 === 0) {
    const stringStone = stone.toString();

    const start = stringStone.slice(0, stringStone.length / 2);
    const end = stringStone.slice(stringStone.length / 2, stringStone.length);

    ret += blink(Number(start), count - 1);
    ret += blink(Number(end), count - 1);

    return ret;
  } else {
    ret += blink(stone * 2024, count - 1);
  }

  memo.set(`${stone}, ${count}`, ret);
  return ret;
}

let result = 0;
for (let i = 0; i < stones.length; i++) {
  result += blink(stones[i], 74);
}

console.log(result);
