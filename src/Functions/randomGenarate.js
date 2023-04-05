// export
function RandomGen(n, arr) {
  let res = "";
  for (let i = 0; i < n; i++) {
    res += arr[Math.floor(Math.random() * arr.length)] + ", ";
  }
  return res;
}

console.log(RandomGen(65, ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]));
console.log(
  RandomGen(84, [55, 65, 76, 54, 77, 85, 79, 97, 87, 82, 83, 67, 56])
);
