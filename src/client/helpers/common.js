export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

export function randomPick(list) {
  return list[randomNumber(list.length)];
}
