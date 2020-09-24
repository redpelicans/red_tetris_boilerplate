export function lowerOrEqualThan(refValue) {
  return (value) => (value <= refValue ? value : refValue);
}

export function divideBy(refValue) {
  return (value) => value / refValue;
}
