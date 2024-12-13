const text = await Deno.readTextFile("Input.txt");
const machines: { x: bigint; y: bigint }[][] = text.split("\n\n").map((i) => {
  const ret = [];
  const tmp = i.split("\n");
  ret.push({
    x: BigInt(tmp[0].slice(tmp[0].indexOf("X+") + 2, tmp[0].indexOf(","))),
    y: BigInt(tmp[0].slice(tmp[0].indexOf("Y+") + 2, tmp[0].length)),
  });
  ret.push({
    x: BigInt(tmp[1].slice(tmp[1].indexOf("X+") + 2, tmp[1].indexOf(","))),
    y: BigInt(tmp[1].slice(tmp[1].indexOf("Y+") + 2, tmp[1].length)),
  });
  ret.push({
    x: BigInt(tmp[2].slice(tmp[2].indexOf("X=") + 2, tmp[2].indexOf(","))) +
      10000000000000n,
    y: BigInt(tmp[2].slice(tmp[2].indexOf("Y=") + 2, tmp[2].length)) +
      10000000000000n,
  });
  return ret;
});

const lowestCosts: bigint[] = [];
let total = 0n;
machines.forEach((machine) => {
  const [X, Y] = [machine[2].x, machine[2].y];
  const d: bigint = machine[0].x * machine[1].y - machine[0].y * machine[1].x;
  const da: bigint = machine[1].y * X - machine[1].x * Y;
  const db: bigint = machine[0].x * Y - machine[0].y * X;

  if (d === 0n) {
    throw new Error("Machine has 0 or an infinite number of solutions");
  } else if (da % d === 0n && db % d === 0n) {
    // Integer solutions exist
    lowestCosts.push(3n * (da / d) + db / d);
    total += 3n * (da / d) + db / d;
  } else {
    // No integer solutions
  }
});

const result = lowestCosts.reduce(
  (acc, cost) => acc + cost,
  0n,
);

console.log(result);
