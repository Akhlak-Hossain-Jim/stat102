export function percentOf(minMax, per) {
  if (
    minMax &&
    minMax.min &&
    minMax.max &&
    !isNaN(minMax.min) &&
    !isNaN(minMax.max) &&
    per &&
    !isNaN(per)
  ) {
    let range = minMax.max - minMax.min;
    let res = minMax.min + range * (per / 100);
    return res;
  }
}
export function percentOfNumInRange(minMax, num) {
  if (
    minMax &&
    minMax.min &&
    minMax.max &&
    !isNaN(minMax.min) &&
    !isNaN(minMax.max) &&
    num &&
    !isNaN(num)
  ) {
    let range = minMax.max - minMax.min;
    let diff = num - minMax.min;
    let res = (diff / range) * 100;
    return res;
  }
}
