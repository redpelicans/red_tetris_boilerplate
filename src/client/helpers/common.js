export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomRangeNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

export function randomPick(list) {
  return list[randomNumber(list.length)];
}

export const isEmpty = (element) => element === null || element?.length === 0;

export function getElapsedTime(startTime) {
  return new Date() - startTime;
}
