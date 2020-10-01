export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

export function randomPick(list) {
  return list[randomNumber(list.length)];
}
export const isEmpty = (element) => element === null || element?.length === 0;

export const throttle = (func, wait) => {
  let waiting;

  return function wrapper() {
    const ctx = this;

    if (!waiting) {
      Reflect.apply(func, ctx, arguments);
      waiting = true;
      setTimeout(() => (waiting = false), wait);
    }
  };
};

export function getElapsedTime(startTime) {
  return new Date(new Date() - startTime);
}
