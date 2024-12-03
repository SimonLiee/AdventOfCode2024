const text = await Deno.readTextFile("Input.txt");

function multi(elem: string) {
  if (elem.indexOf(")") < 0) return 0;

  const slice = elem.slice(0, elem.indexOf(")"));
  const nums = slice.split(",", 2);

  if (isNaN(Number(nums[0])) || isNaN(Number(nums[1]))) {
    return 0;
  }

  return parseInt(nums[0]) * parseInt(nums[1]);
}

const regex = /(mul\(|don't\(\)|do\(\))/g; // RegEx by gpt

let mulEnabled = true;
const result = text
  .matchAll(regex)
  .reduce((acc, i) => {
    if (i[0] === "mul(" && mulEnabled) {
      return (acc += multi(text.slice(i.index + 4)));
    } else if (i[0] === "don't()") {
      mulEnabled = false;
    } else if (i[0] === "do()") {
      mulEnabled = true;
    }

    return acc;
  }, 0);

console.log(result);
