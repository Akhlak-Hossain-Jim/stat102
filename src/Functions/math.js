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
