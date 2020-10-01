export const shallowCopy = (element) => element.slice(0);

export const deepCopy = (element) => {
  if (typeof element !== "object" || element === null) {
    return element;
  }

  const copy = Array.isArray(element) ? [] : {};

  for (const key in element) {
    const value = element[key];
    copy[key] = deepCopy(value);
  }

  return copy;
};

export function pipe(...fns) {
  return (initialValue) => fns.reduce((value, fn) => fn(value), initialValue);
}
