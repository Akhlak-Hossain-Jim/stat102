export function makeNumberArray(str) {
  let arr = str
    .split("-")
    .map((el) => el.replaceAll(" ", ""))
    .map((el) => Number(el));
  let array = [];
  for (let i = arr[0]; i < arr[1]; i++) {
    array.push(i);
  }
  return array;
}

export function makeStringArray(str) {
  let arr = str
    .split(",")
    .map((el) => el.replaceAll(" ", ""))
    .filter((el) => el !== "");
  return arr;
}

export function RandomGenerate(n, arr) {
  let array = [];
  for (let i = 0; i < n; i++) {
    array.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return array.join(", ");
}

export function profitLoss(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    let a = Math.round(Math.random() * 20) + 1;
    let i = Math.round(Math.random() * 2);
    let b = i === 1 ? "Profit" : "Loss";
    let c = `${a}% ${b}`;
    arr.push(c);
  }
  return arr.join(", ");
}

export function randomRange(type = "simple") {
  let x = Math.round(Math.random() * 100);
  if (type === "advanced") {
    x = Math.round(Math.random() * 1000);
    let y = Math.round(Math.random() * 1000);
    while (x === y) {
      Math.round(Math.random() * 1000);
    }
    if (x < y) {
      return x + "-" + y;
    } else {
      return y + "-" + x;
    }
  } else {
    return x + "-" + (x + 50);
  }
}
