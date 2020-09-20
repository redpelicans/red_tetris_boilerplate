function create(col, row) {
  if (col < 10 || row < 10) {
    throw new Error("X or Y dimension shouldn't be under 10");
  }
  return Array.from(Array(row), () => new Array(col).fill(0));
}

export default create;
