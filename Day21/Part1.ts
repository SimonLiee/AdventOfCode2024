const text = await Deno.readTextFile("Example.txt");
const codes: string[][] = text.split("\n").map((elem) => elem.split(""));

type vec2 = { x: number; y: number };

const numpad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [" ", "0", "A"],
];

const keypad = [
  [" ", "^", "A"],
  ["<", "v", ">"],
];

function findCharInPad(char: string, pad: string[][]): vec2 | undefined {
  for (let y = 0; y < pad.length; y++) {
    for (let x = 0; x < pad[y].length; x++) {
      if (pad[y][x] === char) {
        return { x, y };
      }
    }
  }
  return undefined;
}

function isValidPosition(pos: vec2, pad: string[][]): boolean {
  return pos.y >= 0 && pos.y < pad.length && pos.x >= 0 &&
    pos.x < pad[pos.y].length && pad[pos.y][pos.x] !== " ";
}

function getMovementSequence(code: string[], pad: string[][]): string {
  const startPos = findCharInPad("A", pad);
  if (!startPos) {
    throw new Error("Starting position 'A' not found in pad");
  }
  const pos: vec2 = { ...startPos };
  let sequence = "";
  for (const char of code) {
    const charPos = findCharInPad(char, pad);
    if (!charPos) {
      throw new Error("Char not found in keypad");
    }

    while (pos.x !== charPos.x || pos.y !== charPos.y) {
      let newPos: vec2;
      if (pos.x !== charPos.x) {
        newPos = { ...pos, x: pos.x < charPos.x ? pos.x + 1 : pos.x - 1 };
        if (isValidPosition(newPos, pad)) {
          sequence += pos.x < charPos.x ? ">" : "<";
          pos.x = newPos.x;
          continue;
        }
      }
      if (pos.y !== charPos.y) {
        newPos = { ...pos, y: pos.y < charPos.y ? pos.y + 1 : pos.y - 1 };
        if (isValidPosition(newPos, pad)) {
          sequence += pos.y < charPos.y ? "v" : "^";
          pos.y = newPos.y;
          continue;
        }
      }
    }
    sequence += "A";
  }
  return sequence;
}

let result = 0;
for (const code of codes) {
  let sequence = getMovementSequence(code, numpad);
  const num = Number(code.slice(0, -1).join(""));

  for (let i = 0; i < 2; i++) {
    console.log(num, sequence);
    sequence = getMovementSequence(sequence.split(""), keypad);
    sequence = orderSequence(sequence);
  }

  result += num * sequence.length;
}

// Too high: 208126
console.log(result);
