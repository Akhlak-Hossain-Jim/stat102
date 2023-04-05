export function relativeFrequency(a, n) {
  return `${((a / n) * 100).toFixed(2)}%`;
}

export function cumulativeFrequencyLess(data, i, n) {
  let sum = 0;
  for (let j = 0; j <= i; j++) {
    sum += data[j].count;
  }
  return `${sum} (${((sum / n) * 100).toFixed(2)}%)`;
}

export function cumulativeFrequencyMore(data, i, n) {
  let sum = n;
  for (let j = 0; j < i; j++) {
    sum -= data[j].count;
  }
  return `${sum} (${((sum / n) * 100).toFixed(2)}%)`;
}

export function calculateN(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].count;
  }
  return sum;
}

export function sortCalc(data) {
  let dt = [...data];
  return dt.sort((a, b) => b.count - a.count);
}

export function maxFreq(data) {
  let d = [...data];
  return d.sort((a, b) => b.count - a.count)[0].count;
}
