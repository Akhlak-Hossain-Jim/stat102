export function process(str) {
  let res = [];
  let lines = str.split("\n").filter((el) => el !== "");
  let arrOFData;
  let dataTitle;
  let dataContent;
  for (let i = 0; i < lines.length; i++) {
    arrOFData = lines[i] && lines[i].split(":");
    dataTitle = arrOFData[0] && arrOFData[0];
    dataContent =
      arrOFData[1] &&
      arrOFData[1]
        .split(",")
        .filter(
          (el) =>
            el &&
            el !== "" &&
            el !== " " &&
            el !== null &&
            el !== undefined &&
            el !== false
        )
        .map((el) => el.replaceAll(" ", ""));
    dataTitle &&
      dataContent &&
      dataContent.length > 0 &&
      res.push({
        name: dataTitle,
        data: dataContent,
      });
  }
  return res;
}

export function makeFrequencyObj(isNum = true, data) {
  let res = [];
  if (isNum) {
    let numArr = data
      .map((el) => el !== "" && Number(el))
      .filter((el) => el !== false);
    let stData = numArr.sort((a, b) => a - b);
    let min = stData[0];
    let max = stData[stData.length - 1];
    let nOfClass = 1 + Math.round(3.222 * Math.log(stData.length));
    // let interval = Math.round(Math.round((max - min) / nOfClass) / 5) * 5;
    let classArr = [Math.floor(min / 5) * 5];
    for (let i = 1; i < nOfClass; i++) {
      let x = classArr[i - 1] + 10;
      if (x > Math.round(max / 5) * 5 + 10) break;
      else classArr.push(x);
    }
    for (let i = 0; i < classArr.length - 1; i++) {
      let arr = stData.filter((m) => m >= classArr[i] && m < classArr[i + 1]);
      res.push({
        class: `${classArr[i]}-${classArr[i + 1]}`,
        count: arr.length,
        items: arr,
      });
    }
  } else {
    let SET = [...new Set(data)].sort();
    for (let el of SET) {
      let arr = data.filter((m) => el === m);
      res.push({ class: el, count: arr.length, items: arr });
    }
  }
  return res;
}

export function dataIsNumber(data) {
  let res;
  for (let el of data) {
    if (isNaN(el)) {
      res = false;
      break;
    } else {
      res = true;
    }
  }
  return res;
}

export function engVal(x, type = "string") {
  if (x && !isNaN(x)) {
    if (!Number.isInteger(x)) {
      let arr = x.toFixed(20).replace(".", "").split("");
      let n = arr.length;
      let zeros = 0;
      let p;
      for (let i = 0; i < n; i++) {
        if (arr[i] === "0") {
          zeros++;
        } else {
          p = i;
          break;
        }
      }
      if (zeros > 4) {
        let str = "";
        for (let i = p; i < p + 3; i++) {
          if (i === p) {
            str += arr[i] + ".";
          } else if (i === p + 2) {
            if (Number(arr[i + 1]) < 5) {
              str += arr[i];
            } else {
              let a = Number(arr[i]) + 1;
              str += a.toString();
            }
          } else str += arr[i];
        }
        let num;
        if (type === "react") {
          num = (
            <span>
              {str}x10 <sup>-{zeros}</sup>
            </span>
          );
        } else {
          num = `${str}x10^-${zeros}`;
        }
        return num;
      } else {
        return x.toFixed(4);
      }
    } else {
      return x;
    }
  } else {
    return x;
  }
}
