const text = await Deno.readTextFile("Input.txt");
const splitText: string[] = text.split("\n\n");

const patterns = splitText[0].split(", ");
const desiredDesigns = splitText[1].split("\n");

const memo: Record<string, number> = {};

function checkPattern(pattern: string) : number {
  if (pattern in memo) return memo[pattern];
  if (pattern === "") return 1;

  const find = patterns.filter((p) => pattern.startsWith(p));

  const ret = find.reduce(
    (acc, f) => {
      const cp = checkPattern(pattern.slice(f.length));
      return acc + cp;
    },
    0,
  );

  memo[pattern] = ret;
  return ret;
}

const result = desiredDesigns.reduce(
  (acc, p) => {
    const cp = checkPattern(p);
    return acc + cp;
  },
  0,
);

console.log(result);
