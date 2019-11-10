// 0 < percent < 1
export const range = (start: number, end: number, percent: number) =>
  (end - start) * percent + start;

export const clamp = (min: number, max: number, val: number) => Math.max(Math.min(val, max), min);

export const rangeMap = (arr1: number[], arr2: number[], val: number) => {
  const percent = (val - arr1[0]) / (arr1[1] - arr1[0]);
  return range(arr2[0], arr2[1], percent);
};

// https://twitter.com/chpwn/status/285540192096497664
// iOS constant = 0.55
export const rubberBand = (distance: number, dimension: number, constant = 0.15) => {
  return (distance * dimension * constant) / (dimension + constant * distance);
};

// https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
export const rubberband2 = (offset: number, constant = 0.7) => Math.pow(offset, constant);

export const rubberBandIfOutOfBounds = (
  min: number,
  max: number,
  delta: number,
  constant: number,
) => {
  if (delta < min) {
    return -rubberBand(min - delta, max - min, constant) + min;
  }

  if (delta > max) {
    return rubberBand(delta - max, max - min, constant) + max;
  }

  return delta;
};

export const decelerationRates = {
  fast: 0.99,
  normal: 0.998,
};

// https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
// note: velocity in UIkit is points per second, but react use gesture gives px per millisecond,
// so we can simplify somewhat
export const projection = (initialVelocity: number, rateName: 'fast' | 'normal' = 'normal') => {
  const decelerationRate = decelerationRates[rateName];
  return (initialVelocity * decelerationRate) / (1 - decelerationRate);
};

export const findNearestNumberInArray = (n: number, arr: number[]) => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  if (n <= sortedArr[0]) {
    return sortedArr[0];
  }

  if (n >= sortedArr[arr.length - 1]) {
    return sortedArr[arr.length - 1];
  }

  for (let i = 1; i < sortedArr.length; i++) {
    const prev = sortedArr[i - 1];
    const current = sortedArr[i];
    if (current === n) {
      return current;
    }

    if (current > n && prev < n) {
      return current - n < n - prev ? current : prev;
    }
  }

  return sortedArr[0];
};
