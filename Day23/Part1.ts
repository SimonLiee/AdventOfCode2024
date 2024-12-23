const text = await Deno.readTextFile("Input.txt");
const connections: [string, string][] = text.split("\n").map((e) =>
  e.split("-") as [string, string]
);

const connectionsMap = new Map<string, string[]>();
connections.forEach(([a, b]) => {
  if (!connectionsMap.has(a)) connectionsMap.set(a, []);
  connectionsMap.get(a)!.push(b);
  if (!connectionsMap.has(b)) connectionsMap.set(b, []);
  connectionsMap.get(b)!.push(a);
});

const setsOfThreeT: Set<string> = new Set();
for (const [key, value] of connectionsMap) {
  for (const v of value) {
    for (const vv of connectionsMap.get(v)!) {
      if (connectionsMap.get(vv)!.includes(key)) {
        const t = [key, v, vv].sort().join("-");
        if (t.includes("-t") || t.startsWith("t")) {
          setsOfThreeT.add(t);
        }
      }
    }
  }
}

console.log(setsOfThreeT.size);
