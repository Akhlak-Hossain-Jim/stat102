import { dataIsNumber } from "./processData";

export function RangeCalc(data) {
  let res;
  let min;
  let max;
  if (dataIsNumber(data)) {
    let a = data.map((el) => Number(el)).sort((a, b) => a - b);
    min = a[0];
    max = a[a.length - 1];
    res = max - min;
  }
  return { range: res, min, max };
}

export function MeanDeviationCalc(data) {
  if (dataIsNumber(data)) {
    let arr = [...data].map((el) => Number(el));
    let n = arr.length;
    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / n;
    let arr2 = [...arr].map((el) => Math.abs(el - avg));
    let sum2 = arr2.reduce((a, b) => a + b, 0);
    let res = sum2 / n;
    return { sumOfDiff: sum2, res, avg, arr2 };
  }
}

export function StdDeviationCalc(data, dataType) {
  if (dataIsNumber(data)) {
    let arr = [...data].map((el) => Number(el));
    let n = arr.length;
    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / n;
    if (dataType === "sample") {
      let arr2 = [...arr].map((el) => Number((el - avg).toFixed(2)) ** 2);
      let sum2 = arr2.reduce((a, b) => Number((a + b).toFixed(4)), 0);
      let res = Math.sqrt(sum2 / (n - 1));
      return { sumOfDiff: sum2, res, avg, arr2 };
    } else if (dataType === "population") {
      let arr2 = [...arr].map((el) => Number((el - avg).toFixed(2)) ** 2);
      let sum2 = arr2.reduce((a, b) => Number((a + b).toFixed(4)), 0);
      let res = Math.sqrt(sum2 / n);
      return { sumOfDiff: sum2, res, avg, arr2 };
    }
  }
}

export function QuartileDeviationCalc(data) {
  if (dataIsNumber(data)) {
    let arr = [...data].map((el) => Number(el));
    let sArr = arr.sort((a, b) => a - b);
    let n = arr.length;
    let q1 = ((n + 1) * 25) / 100;
    let q3 = ((n + 1) * 75) / 100;
    let q1val =
      sArr[Math.floor(q1) - 1] +
      (q1 - Math.floor(q1)) * (sArr[Math.floor(q1)] - sArr[Math.floor(q1) - 1]);
    let q3val =
      sArr[Math.floor(q3) - 1] +
      (q3 - Math.floor(q3)) * (sArr[Math.floor(q3)] - sArr[Math.floor(q3) - 1]);
    let iqr = q3val - q1val;
    let res = iqr / 2;
    return { q1: q1val, q3: q3val, iqr, res };
  }
}

export function VarianceCalc(data, dataType) {
  if (dataIsNumber(data)) {
    let arr = [...data].map((el) => Number(el));
    let n = arr.length;
    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / n;
    if (dataType === "sample") {
      let arr2 = [...arr].map((el) => Number((el - avg).toFixed(2)) ** 2);
      let sum2 = arr2.reduce((a, b) => Number((a + b).toFixed(4)), 0);
      let res = sum2 / (n - 1);
      return { sumOfDiff: sum2, res, avg, arr2 };
    } else if (dataType === "population") {
      let arr2 = [...arr].map((el) => Number((el - avg).toFixed(2)) ** 2);
      let sum2 = arr2.reduce((a, b) => Number((a + b).toFixed(4)), 0);
      let res = sum2 / n;
      return { sumOfDiff: sum2, res, avg, arr2 };
    }
  }
}
