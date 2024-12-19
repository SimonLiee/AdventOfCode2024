const text = await Deno.readTextFile("Input.txt");
const splitText: string[] = text.split("\n\n");

const patterns = splitText[0].split(", ");
const desiredDesigns = splitText[1].split("\n");

const memo : Record<string, boolean> = {}

function checkPattern(pattern: string) {
  if(pattern in memo) return memo[pattern];
  if (pattern === "") return true;

  const find = patterns.filter((p) => pattern.startsWith(p));

  const ret = find.reduce(
    (acc, f) : boolean => checkPattern(pattern.slice(f.length)) ? true : acc,
    false,
  );

  memo[pattern] = ret;
  return ret;
}

const result = desiredDesigns.reduce(
  (acc, d) => checkPattern(d) ? acc + 1 : acc,
  0,
);

console.log(result);
