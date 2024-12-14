const text = await Deno.readTextFile("Input.txt");
let robots: { x: number; y: number; vx: number; vy: number }[] = text
  .split("\n")
  .map((i) => {
    const ret = { x: 0, y: 0, vx: 0, vy: 0 };
    const tmp = i.split(" ");

    ret.x = Number(tmp[0].slice(tmp[0].indexOf("=") + 1, tmp[0].indexOf(",")));
    ret.y = Number(tmp[0].slice(tmp[0].indexOf(",") + 1));
    ret.vx = Number(tmp[1].slice(tmp[1].indexOf("=") + 1, tmp[1].indexOf(",")));
    ret.vy = Number(tmp[1].slice(tmp[1].indexOf(",") + 1));

    return ret;
  });

// 101 103
const width = 101; //11;
const height = 103; //7;

function moveBots() {
  robots = robots.map(({ x, y, vx, vy }) => {
    return {
      x: x + vx < 0
        ? width + (x + vx)
        : x + vx >= width
        ? x + vx - width
        : x + vx,
      y: y + vy < 0
        ? height + (y + vy)
        : y + vy >= height
        ? y + vy - height
        : y + vy,
      vx: vx,
      vy: vy,
    };
  });
}

function drawBots() {
  for (let i = 0; i < height; i++) {
    let line = "";
    for (let j = 0; j < width; j++) {
      if (robots.find(({ x, y }) => j === x && i === y)) {
        line += "O";
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
}

for (let i = 0; i < 100000; i++) {
  moveBots();
  robots.sort(({ x: ax, y: ay }, { x: bx, y: by }) =>
    ay !== by ? ay - by : ax - bx
  );
  let sum = robots.reduce((acc, { x, y }, i) => {
    if (i + 1 < robots.length) {
      if (y === robots[i + 1].y) {
        if (!(robots[i + 1].x - x < 2)) {
          return acc + robots[i + 1].x - x;
        }
      }
    }
    return acc;
  }, 0);
  if(sum < 3500){
    drawBots();
    console.log(sum);
    console.log(i + 1);
    break;
  }
}
