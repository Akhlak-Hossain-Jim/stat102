import {
  ValueOfNormByZNegative,
  ValueOfNormByZPositive,
} from "../data/ValueFromZ";

export function nCr(n, r) {
  return fact(n) / (fact(r) * fact(n - r));
}
function fact(n) {
  if (n === 0) return 1;
  var res = 1;
  for (var i = 2; i <= n; i++) res = res * i;
  return res;
}

export function Bin(n, p, x, mode = "s") {
  if (mode === "s") {
    let fact = nCr(n, x);
    let a = 1 - p;
    let b = n - x;
    let res = fact * Math.pow(p, x) * Math.pow(a, b);
    return res;
  } else if (mode === "m") {
    let res = 0;
    for (let el of x) {
      let fact = nCr(n, el);
      let a = 1 - p;
      let b = n - el;
      res += fact * Math.pow(p, el) * Math.pow(a, b);
    }
    return res;
  } else return undefined;
}

export function Poiss(avg, x, mode = "s", calc = "s") {
  if (mode === "s" && calc === "s") {
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
  } else if (mode === "m" && calc === "s") {
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
  } else if (mode === "m" && calc === "l") {
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
    return 1 - res;
  } else return undefined;
}

export function NormalDis(avg, x, SD, calc = "s", y = 0) {
  if (avg && x && SD && calc) {
    let res;
    if (calc === "s") {
      let pow = -0.5 * (((x - avg) / SD) * ((x - avg) / SD));
      let a = (1 / (SD * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, pow);
      res = a;
      return res;
    } else if (calc === "l") {
      let pow = -0.5 * (((x - avg) / SD) * ((x - avg) / SD));
      let a = (1 / (SD * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, pow);
      // console.log(a.toFixed(16));
      res = 1 - a;
      return res;
    } else if (calc === "b" && y) {
      let a, b;
      if (x > y) {
        a = x;
        b = y;
      } else {
        b = x;
        a = y;
      }
      let powA = (-1 / 2) * ((a - avg) / SD) ** 2;
      let powB = (-1 / 2) * ((b - avg) / SD) ** 2;
      let ac =
        (1 / (Math.sqrt(2 * Math.PI) * SD ** 2)) * Math.pow(Math.E, powA);
      let bc =
        (1 / (Math.sqrt(2 * Math.PI) * SD ** 2)) * Math.pow(Math.E, powB);
      res = ac - bc;
      return res;
    } else if (calc === "z") {
      res = (x - avg) / SD;
      return res;
    }
  } else return undefined;
}

export function ProbabilityByZ(z) {
  if (z && !isNaN(z)) {
    let res;
    let a = Math.abs(z).toFixed(2).replace(".", "");
    if (z >= 0) {
      res = ValueOfNormByZPositive[a];
      console.log(a, z.toFixed(2), res);
    } else {
      res = ValueOfNormByZNegative[a];
      console.log(a, z, res);
    }
    return res;
  } else return undefined;
}

export function ExponentialCalc(x, mean, type = "s", y) {
  if (x && mean && !isNaN(x) && !isNaN(mean)) {
    let res;
    let le = Math.pow(Math.E, -(x / mean));
    if (type === "s") {
      res = 1 - le;
    } else if (type === "l") {
      res = 1 - (1 - le);
    } else if (type === "b" && y && !isNaN(y)) {
      let xr = 1 - le;
      let yr = 1 - Math.pow(Math.E, -(y / mean));
      res = xr - yr;
    }
    return res;
  } else return undefined;
}
