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

function findCliques(graph: Map<string, string[]>): string[][] {
  const cliques: string[][] = [];

  function findCliquesRecursive(
    potentialClique: string[],
    remainingNodes: string[],
    skipNodes: string[]
  ) {
    if (remainingNodes.length === 0 && skipNodes.length === 0) {
      cliques.push([...potentialClique]);
      return;
    }

    for (const node of remainingNodes) {
      const newPotentialClique = [...potentialClique, node];
      const newRemainingNodes = remainingNodes.filter((n) => graph.get(node)!.includes(n));
      const newSkipNodes = skipNodes.filter((n) => graph.get(node)!.includes(n));

      findCliquesRecursive(newPotentialClique, newRemainingNodes, newSkipNodes);

      remainingNodes = remainingNodes.filter((n) => n !== node);
      skipNodes.push(node);
    }
  }

  findCliquesRecursive([], Array.from(graph.keys()), []);

  return cliques;
}

const cliques = findCliques(connectionsMap);
const biggestClique = cliques.reduce((max, clique) =>
  clique.length > max.length ? clique : max
);

console.log(biggestClique.sort().join(","));
