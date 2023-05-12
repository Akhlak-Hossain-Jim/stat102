import { dataIsNumber } from "./processData";

export function findMedian(data) {
  if (dataIsNumber(data)) {
    let res;
    let arr = [...data].map((el) => Number(el)).sort((a, b) => a - b);
    let i = (arr.length + 1) / 2;
    if (Number.isInteger(i)) {
      res = arr[i - 1];
    } else {
      let a = (Number(arr[Math.floor(i) - 1]) + Number(arr[Math.floor(i)])) / 2;
      res = a;
    }
    return res;
  }
}
