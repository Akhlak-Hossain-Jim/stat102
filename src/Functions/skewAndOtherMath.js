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
export function StemLeafTable(data) {
  if (dataIsNumber(data)) {
    let arr = [...data].map((el) => Number(el)).sort((a, b) => a - b);
    let variants = [];
    let res;
    for (let i = 0; i < arr.length; i++) {
      let dec = arr[i].toFixed(2);
      let a = dec.split(".");
      let n = a[0].length;
      variants.push(n);
    }
    let SET = [...new Set(variants)];
    let mostAre = 0;
    let identifier;
    for (let el of SET) {
      let b = [...variants].filter((e) => e === el).length;
      if (b > mostAre) {
        mostAre = b;
        identifier = el;
      }
    }
    let key =
      identifier > 0 && identifier === 1
        ? "1"
        : `1${[...Array(identifier - 1)].map((el) => "0").join("")}`;
    let arr2 = [];
    for (let i = 0; i < 10; i++) {
      let array = [...arr].filter(
        (el) => el < (1 + i) * Number(key) && el >= i * Number(key)
      );
      if (array.length !== 0) {
        arr2.push({ key: i * Number(key), array, count: array.length });
      }
    }
    res = {
      nthPlace: key,
      table: arr2,
      arr,
      arrc: [].concat.apply(
        [],
        arr2.map((el) => el.array)
      ),
    };
    return res;
  }
}
// sasd: 85, 54, 56, 72, 90, 84, 74, 54, 73, 91, 77, 80, 47, 62, 49, 71, 83, 61, 79, 71, 55, 93, 61, 72, 58, 75, 73, 77, 70, 47, 76, 98, 91, 98, 78, 64, 65, 75, 78, 57, 51, 80, 76, 97, 91, 47, 51, 59, 94, 71
