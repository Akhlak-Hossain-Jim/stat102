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

export function CoEffVariationCalc(data, dataType) {
  let result;
  let array = [];
  for (let item of data) {
    if (dataIsNumber(item.data)) {
      let arr = [...item.data].map((el) => Number(el));
      let n = arr.length;
      let sum = arr.reduce((a, b) => a + b, 0);
      let avg = sum / n;
      if (dataType === "sample") {
        let arr2 = [...arr].map((el) => (el - avg) ** 2);
        let sum2 = arr2.reduce((a, b) => a + b, 0);
        let std = Math.sqrt(sum2 / (n - 1));
        let cv = ((std / avg) * 100).toFixed(2);
        array.push({
          name: item.name,
          std,
          avg,
          arr,
          arr2,
          cv,
        });
      } else if (dataType === "population") {
        let arr2 = [...arr].map((el) => (el - avg) ** 2);
        let sum2 = arr2.reduce((a, b) => a + b, 0);
        let std = Math.sqrt(sum2 / n);
        let cv = ((std / avg) * 100).toFixed(2);
        array.push({
          name: item.name,
          std,
          avg,
          arr,
          arr2,
          cv,
        });
      }
    }
  }
  result = array.sort((a, b) => Number(b.cv) - Number(a.cv));
  return result;
}

export function CoEffMeanDeviationCalc(data) {
  let result;
  let array = [];
  for (let item of data) {
    if (dataIsNumber(item.data)) {
      let arr = [...item.data].map((el) => Number(el));
      let n = arr.length;
      let sum = arr.reduce((a, b) => a + b, 0);
      let avg = sum / n;
      let arr2 = [...arr].map((el) => Math.abs(el - avg));
      let sum2 = arr2.reduce((a, b) => a + b, 0);
      let meanD = sum2 / n;
      let cd = ((meanD / avg) * 100).toFixed(2);
      array.push({
        name: item.name,
        meanD,
        avg,
        arr,
        arr2,
        cd,
      });
    }
  }
  result = array.sort((a, b) => Number(b.cd) - Number(a.cd));
  return result;
}

export function CoEffRangeCalc(data) {
  let result;
  let array = [];
  for (let item of data) {
    if (dataIsNumber(item.data)) {
      let arr = [...item.data].map((el) => Number(el)).sort((a, b) => a - b);
      let min = arr[0];
      let max = arr[arr.length - 1];
      let sub = max - min;
      let sum = max + min;
      let cd = ((sub / sum) * 100).toFixed(2);
      array.push({
        name: item.name,
        arr,
        min,
        max,
        sub,
        sum,
        cd,
      });
    }
  }
  result = array.sort((a, b) => Number(b.cd) - Number(a.cd));
  return result;
}
export function CoEffQuartileDeviationCalc(data) {
  let result;
  let array = [];
  for (let item of data) {
    if (dataIsNumber(item.data)) {
      let arr = [...item.data].map((el) => Number(el)).sort((a, b) => a - b);
      let n = arr.length;
      let q1 = ((n + 1) * 25) / 100;
      let q3 = ((n + 1) * 75) / 100;
      let q1val =
        arr[Math.floor(q1) - 1] +
        (q1 - Math.floor(q1)) * (arr[Math.floor(q1)] - arr[Math.floor(q1) - 1]);
      let q3val =
        arr[Math.floor(q3) - 1] +
        (q3 - Math.floor(q3)) * (arr[Math.floor(q3)] - arr[Math.floor(q3) - 1]);
      let sub = q3val - q1val;
      let sum = q3val + q1val;
      let cd = ((sub / sum) * 100).toFixed(2);
      array.push({
        name: item.name,
        arr,
        q1: q1val,
        q3: q3val,
        sub,
        sum,
        cd,
      });
    }
  }
  result = array.sort((a, b) => Number(b.cd) - Number(a.cd));
  return result;
}
