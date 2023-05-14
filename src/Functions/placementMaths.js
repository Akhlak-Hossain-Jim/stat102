import { dataIsNumber } from "./processData";

export function findMinMax(data, finding) {
  if (data && dataIsNumber(data) && finding) {
    let par = finding.toLowerCase();
    let arr = [...data].map((el) => Number(el)).sort((a, b) => a - b);
    let n = arr.length;
    let res;
    if (par === "min" || par === "minimum") {
      res = arr[0];
    } else if (par === "max" || par === "maximum") {
      res = arr[n - 1];
    }
    return res;
  }
}

export function findPercentile(data, percentile) {
  if (data && dataIsNumber(data) && percentile) {
    let res;
    let arr = [...data].map((el) => Number(el)).sort((a, b) => a - b);
    let n = arr.length;
    let per = ((n + 1) * percentile) / 100;
    let a =
      arr[Math.floor(per) - 1] !== undefined ? arr[Math.floor(per) - 1] : 0;
    let b = arr[Math.floor(per)] !== undefined ? arr[Math.floor(per)] : 0;
    let f = a + (per - Math.floor(per)) * (b - a);
    res = f;
    return res;
  }
}

export function findMinMaxWithoutExtreme(data, finding) {
  if (data && dataIsNumber(data) && finding) {
    let par = finding.toLowerCase();
    let arr = [...data].map((el) => Number(el)).sort((a, b) => a - b);
    let arrRev = [...arr].sort((a, b) => b - a);
    let q1 = findPercentile(data, 25);
    let q3 = findPercentile(data, 75);
    let IQR = q3 - q1;
    let LowerLimit = q1 - 1.5 * IQR;
    let UpperLimit = q3 + 1.5 * IQR;

    let res;
    let minLL;
    let maxUL;
    let minA = [...arr].filter((el) => el < LowerLimit);
    let maxA = [...arr].filter((el) => el > UpperLimit);
    for (let el of arr) {
      if (el >= LowerLimit) {
        minLL = el;
        break;
      } else continue;
    }
    for (let el of arrRev) {
      if (el <= UpperLimit) {
        maxUL = el;
        break;
      } else continue;
    }
    if (par === "min" || par === "minimum") {
      res = { value: minLL, array: minA };
    } else if (par === "max" || par === "maximum") {
      res = { value: maxUL, array: maxA };
    }
    return res;
  }
}
