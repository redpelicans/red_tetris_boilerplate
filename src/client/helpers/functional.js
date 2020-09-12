export const deepCopy = (array) => JSON.parse(JSON.stringify(array));

export const isEmpty = (element) => element === null || element?.length === 0;
