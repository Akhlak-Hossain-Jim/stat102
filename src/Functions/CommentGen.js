export function CoEffCommentGen(data, text, type = "normal") {
  let arr = [];
  if (type === "reverse") {
    for (let i = data.length - 1; i > 0; i--) {
      let str = `"${data[i]}" data ${text} "${data[i - 1]}" data`;
      arr.push(str);
    }
  } else {
    for (let i = 0; i < data.length - 1; i++) {
      let str = `"${data[i]}" data ${text} "${data[i + 1]}" data`;
      arr.push(str);
    }
  }
  return arr.join(", ");
}
