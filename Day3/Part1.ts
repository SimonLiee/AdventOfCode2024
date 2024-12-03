const text = await Deno.readTextFile("Input.txt");

const splitData = text.split("mul(");
splitData.shift();
const parsedData = splitData.map((elem) => {
  if (elem.indexOf(")") < 0) return NaN;

  const slice = elem.slice(0, elem.indexOf(")"));
  const nums = slice.split(",");

  if(nums.length != 2){
    return NaN
  }

  if(isNaN(Number(nums[0])) || isNaN(Number(nums[1]))){
    return NaN
  }
  return parseInt(nums[0]) * parseInt(nums[1]);
});

const result = parsedData
  .filter((elem) => !isNaN(elem))
  .reduce((acc, elem) => acc + elem, 0);

console.log(parseFloat("100") * parseFloat("121>> #from("))
console.log(result);
