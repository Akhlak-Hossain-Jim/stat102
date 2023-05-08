// export
function RandomGen(n, arr) {
  let res = "";
  for (let i = 0; i < n; i++) {
    res += arr[Math.floor(Math.random() * arr.length)] + ", ";
  }
  return res;
}

// console.log(RandomGen(65, ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]));
// console.log(
//   RandomGen(84, [55, 65, 76, 54, 77, 85, 79, 97, 87, 82, 83, 67, 56])
// );

function Poiss(avg, x, mode = "s") {
  if (mode === "s") {
    let res;
    let fact = 1;
    for (let i = 1; i <= x; i++) {
      fact *= i;
    }
    let a = Math.pow(avg, x);
    let b = Math.pow(Math.E, -avg);
    let c = a * b;
    res = c / fact;
    return res;
  } else if (mode === "m") {
    let res = 0;
    for (let el of x) {
      let fact = 1;
      for (let i = 1; i <= el; i++) {
        fact *= i;
      }
      let a = Math.pow(avg, el);
      let b = Math.pow(Math.E, -avg);
      let c = a * b;
      res = c / fact;
    }
    return res;
  } else return undefined;
}

// console.log("4no ans");
// console.log(Poiss(10, 0));
// console.log(Poiss(10, [0, 1, 2, 3], "m"));
// console.log(Poiss(5, 0));
// console.log(1 - Poiss(2.5, 0));
// console.log("5no ans");
// console.log(Poiss(1.25, 0));
// console.log(Poiss(1.25, 1));
// console.log(1 - (Poiss(1.25, 0) + Poiss(1.25, 1)));
// console.log("6no ans");
// console.log(Poiss(3, 0));
// console.log(1 - (Poiss(3, 0) + Poiss(3, 1)));
// console.log(Poiss(0.25, 0));

function Norm(x, avg, sd) {
  return (x - avg) / sd;
}

console.log("7no ans");
console.log(Norm(18000, 15015, 3540));
console.log(1 - 0.5636);
console.log(Norm(10000, 15015, 3540));
console.log(Norm(14000, 15015, 3540));
console.log(Norm(12000, 15015, 3540));
console.log(0.5636 - 0.1977);

console.log("8no ans");
console.log(Norm(40, 30, 8.2));
console.log(1 - 0.8888);
console.log(Norm(20, 30, 8.2));

console.log("9no ans");
console.log(Norm(500, 328, 92));
console.log(1 - 0.8888);
console.log(Norm(250, 328, 92));
