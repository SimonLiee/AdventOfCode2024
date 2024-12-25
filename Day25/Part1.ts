const text = await Deno.readTextFile("Input.txt");
const locksNKeys = text.split("\n\n").map((e) =>
  e.split("\n").map((l) => l.split(""))
);

const locks: number[][] = [];
const keys: number[][] = [];
locksNKeys.forEach((lk) => {
  const newlk = [];
  for (let i = 0; i < lk.length; i++) {
    for (let j = 0; j < lk[i].length; j++) {
      if (!newlk[j]) newlk[j] = 0;
      if (lk[i][j] === "#") newlk[j]++;
    }
  }

  if (lk[0][0] === "#") {
    locks.push(newlk);
  } else {
    keys.push(newlk);
  }
});

let count = 0;
locks.forEach((lock)=>{
  keys.forEach((key)=>{
    let fit = true;
    lock.forEach((_, i)=>{
      if(key[i] + lock[i] > 7)
        fit = false;
    });
    if(fit)
      count++;
  });
});

console.log(count);
