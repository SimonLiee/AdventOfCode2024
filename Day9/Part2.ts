const text = await Deno.readTextFile("Input.txt");
const compFile: number[] = text.split("").map((elem) => Number(elem));

const file: { id: number; size: number }[] = [];
const nofreeFile: { id: number; size: number }[] = [];
compFile.forEach((size, i) => {
  const id = i % 2 === 0 ? (i === 0 ? 0 : i / 2) : -1;
  file.push({ id, size });
  if (id !== -1) {
    nofreeFile.push({ id, size });
  }
});

for (let i = nofreeFile.length - 1; i > 0; i--) {
  for (let j = 0; file[j].id !== nofreeFile[i].id; j++) {
    if (file[j].id === -1 && file[j].size >= nofreeFile[i].size) {
      const idx = file.findIndex((elem) => elem.id === nofreeFile[i].id);
      file[idx].id = -1;
      if (idx + 1 < file.length && file[idx + 1].id === -1) {
        file[idx].size += file[idx + 1].size;
        file.splice(idx + 1, 1);
      }
      if (idx - 1 >= 0 && file[idx - 1].id === -1) {
        file[idx - 1].size += file[idx].size;
        file.splice(idx, 1);
      }

      if (file[j].size - nofreeFile[i].size > 0) {
        file[j].size -= nofreeFile[i].size;
        file.splice(j, 0, nofreeFile[i]);
      } else {
        file.splice(j, 1, nofreeFile[i]);
      }
      break;
    }
  }
}

let result = 0;
let pos = 0;

file.forEach((block) => {
  for (let j = 0; j < block.size; j++) {
    if (block.id !== -1) {
      result += pos * block.id;
    }
    pos++;
  }
});

console.log(result);
