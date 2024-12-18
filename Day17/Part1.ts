const text = await Deno.readTextFile("Input.txt");
const splitText: string[] = text.split("\n\n");

const registers: Record<string, number> = {};
splitText[0].split("\n").forEach((line) => {
  const splt = line.split(": ");
  registers[splt[0][splt[0].length - 1]] = Number(splt[1]);
});
const program = splitText[1].split(":")[1].split(",").map(Number);

enum Op {
  adv,
  bxl,
  bst,
  jnz,
  bxc,
  out,
  bdv,
  cdv,
}

function literal2combo(combo: number): number {
  if (combo < 4) {
    return combo;
  }
  const comboMap: Record<number, string> = {
    4: "A",
    5: "B",
    6: "C",
  };
  return registers[comboMap[combo]];
}

function execute(op: Op, literal: number) {
  const combo = literal2combo(literal);

  switch (op) {
    case Op.adv: // Div A
      registers["A"] = Math.floor(registers["A"] / (2 ** combo));
      break;
    case Op.bxl: // Bitwise OR
      registers["B"] = registers["B"] ^ literal;
      break;
    case Op.bst:
      registers["B"] = combo % 8;
      break;
    case Op.jnz:
      if (registers["A"] !== 0) {
        pc = literal - 2;
      }
      break;
    case Op.bxc:
      registers["B"] = registers["B"] ^ registers["C"];
      break;
    case Op.out:
      output.push(combo % 8);
      break;
    case Op.bdv:
      registers["B"] = Math.floor(registers["A"] / (2 ** combo));
      break;
    case Op.cdv:
      registers["C"] = Math.floor(registers["A"] / (2 ** combo));
      break;
    default:
      console.log("invalid OP!!!");
      break;
  }
}

let pc = 0;
const output: number[] = [];
for (pc = 0; pc < program.length; pc += 2) {
  execute(program[pc], program[pc + 1]);
}

console.log(output.reduce((acc, num) => acc + num, ""));
