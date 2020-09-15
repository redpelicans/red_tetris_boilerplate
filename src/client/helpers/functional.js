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

export const isEmpty = (element) => element === null || element?.length === 0;
