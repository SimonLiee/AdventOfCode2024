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

const result = updates.reduce((acc, update) => {
  if (checkUpdate(update)) {
    return acc + update[Math.round((update.length - 1) / 2)];
  }

  return acc;
}, 0);

console.log(result)
