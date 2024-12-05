const text = await Deno.readTextFile("Input.txt");
const splitData = text.split("\n");

const rules = splitData
  .slice(0, splitData.indexOf(""))
  .map((elem) => elem.split("|").map((num) => Number(num)));

const updates = splitData
  .slice(splitData.indexOf("") + 1)
  .map((elem) => elem.split(",").map((num) => Number(num)));

function checkUpdate(update: number[]): boolean {
  return rules.reduce((acc, rule) => {
    if (!acc) return acc;

    if (update.includes(rule[0]) && update.includes(rule[1])) {
      if (update.indexOf(rule[0]) < update.indexOf(rule[1])) {
        return true;
      }
      return false;
    }
    return true;
  }, true);
}

function sortUpdate(update : number[]): number[] {
  return update.sort((num1, num2) => {
    let ret = 0
    rules.forEach((rule) => {
      if (rule.includes(num1) && rule.includes(num2)) {
        if (num1 == rule[0]) ret = -1;
        else ret = 1;
      }
    });
    return ret;
  });
}

const result = updates.reduce((acc, update) => {
  if (!checkUpdate(update)) {
    return acc + sortUpdate(update)[Math.round((update.length - 1) / 2)];
  }

  return acc;
}, 0);

console.log(result);
