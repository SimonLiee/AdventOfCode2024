const text = await Deno.readTextFile("Input.txt");
const [wires, gates] = text.split("\n\n", 2);

const wireMap = wires.split("\n").reduce((map, wire) => {
  const [key, value] = wire.split(": ");
  map.set(key, Number(value));
  return map;
}, new Map<string, number | undefined>());

const gateList = gates.split("\n").reduce((list, gate) => {
  const [v1, op, v2, , out] = gate.split(" ");
  list.push([v1, op, v2, out]);
  return list;
}, [] as [string, string, string, string][]);

function operate(
  v1: number | undefined,
  op: string,
  v2: number | undefined,
): number | undefined {
  if (v1 === undefined || v2 === undefined) return undefined;
  switch (op) {
    case "AND":
      return v1 & v2;
    case "OR":
      return v1 | v2;
    case "XOR":
      return v1 ^ v2;
    default:
      console.error("Unknown operation:", op);
      return undefined;
  }
}

function tick() {
  gateList.forEach(([v1, op, v2, out]) => {
    wireMap.set(out, operate(wireMap.get(v1), op, wireMap.get(v2)));
  });
}

const zWires = gateList
  .map(([_v1, _op, _v2, out]) => (out.startsWith("z") ? out : undefined))
  .filter((e) => e !== undefined) as string[];

while (zWires.some((curr) => wireMap.get(curr) === undefined)) {
  tick();
}

const result = zWires
  .sort()
  .reverse()
  .reduce((acc, curr) => acc + wireMap.get(curr), "");

console.log(parseInt(result, 2));
