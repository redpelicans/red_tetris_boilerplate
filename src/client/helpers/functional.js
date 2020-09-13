export const shallowCopy = (element) => element.slice(0);

export const deepCopy = (element) => {
  if (typeof element !== "object" || element === null) {
    return element; // Return the value if element is not an object
  }

  // Create an array or object to hold the values
  const copy = Array.isArray(element) ? [] : {};

  for (const key in element) {
    const value = element[key];

    // Recursively (deep) copy for nested objects, including arrays
    copy[key] = deepCopy(value);
  }

  return copy;
};

export const isEmpty = (element) => element === null || element?.length === 0;
