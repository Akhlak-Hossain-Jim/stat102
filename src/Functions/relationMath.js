import { dataIsNumber } from "./processData";

export function findRelation(data, data2) {
  if (
    data &&
    data2 &&
    dataIsNumber(data) &&
    dataIsNumber(data2) &&
    data.length === data2.length
  ) {
    let arr1 = [...data].map((el) => Number(el));
    let arr2 = [...data2].map((el) => Number(el));
    let n = arr1.length;
    let sumArr1 = arr1.reduce((a, b) => a + b, 0);
    let sumArr2 = arr2.reduce((a, b) => a + b, 0);
    let x_bar = sumArr1 / n;
    let y_bar = sumArr2 / n;
    let xMx_bar = [...arr1].map((el) => el - x_bar);
    let yMy_bar = [...arr2].map((el) => el - y_bar);
    let multiplyOfSubs = [];
    for (let i = 0; i < n; i++) {
      let a = xMx_bar[i] * yMy_bar[i];
      multiplyOfSubs.push(a);
    }
    let xMx_barSq = [...xMx_bar].map((el) => el * el);
    let yMy_barSq = [...yMy_bar].map((el) => el * el);
    let sumOfMultiplyOfSubs = multiplyOfSubs.reduce((a, b) => a + b, 0);
    let sumOfXSubSq = xMx_barSq.reduce((a, b) => a + b, 0);
    let sumOfYSubSq = yMy_barSq.reduce((a, b) => a + b, 0);
    let array = [];
    for (let i = 0; i < n; i++) {
      let object = {
        x: arr1[i],
        y: arr2[i],
        xSubXBar: xMx_bar[i],
        ySubYBar: yMy_bar[i],
        sumOfSubs: multiplyOfSubs[i],
        xSq: xMx_barSq[i],
        ySq: yMy_barSq[i],
      };
      array.push(object);
    }
    let Sxy = sumOfMultiplyOfSubs / (n - 1);
    let Sx = Math.sqrt(sumOfXSubSq / (n - 1));
    let Sy = Math.sqrt(sumOfYSubSq / (n - 1));
    let r = Sxy / (Sx * Sy);
    let obj = {
      xAvg: x_bar,
      yAvg: y_bar,
      sumOfSubs: sumOfMultiplyOfSubs,
      sumOfXSubSq,
      sumOfYSubSq,
      array,
      Sxy,
      Sx,
      Sy,
      r,
    };
    return obj;
  } else return undefined;
}

export function findRelationType(R) {
  if (!isNaN(R)) {
    let res;
    if (R >= -1 && R < -0.5) {
      res = "Strong Negative";
    } else if (R >= -0.5 && R < 0) {
      res = "Weak Negative";
    } else if (R === 0) {
      res = "No";
    } else if (R <= 0.5 && R > 0) {
      res = "Weak Positive";
    } else if (R <= 1 && R > 0.5) {
      res = "Strong Positive";
    }
    return res;
  } else return undefined;
}
