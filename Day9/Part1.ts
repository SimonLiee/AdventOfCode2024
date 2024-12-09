const text = await Deno.readTextFile("Input.txt");
const compFile: number[] = text.split("").map((elem) => Number(elem));

const file = [];
for (let i = 0; i < compFile.length; i++) {
  if (i % 2 == 0) {
    for (let j = 0; j < compFile[i]; j++) {
      file.push(i === 0 ? 0 : i / 2);
    }
  } else {
    for (let j = 0; j < compFile[i]; j++) {
      file.push(-1);
    }
  }
}

let first = 0;
let last = file.length - 1;

while (first < last) {
  while (file[first] != -1) {
    first++;
  }
  if(first >= last) {
    break;
  }

  file[first] = file[last];
  file[last] = -1;
  last--;
}

let result = 0;
for(let i = 0; file[i] != -1; i++) {
  result += i * file[i];
}

console.log(result);