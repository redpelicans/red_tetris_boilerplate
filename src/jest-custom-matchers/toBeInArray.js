module.exports = function toBeInArray(received, array) {
  const pass = array.includes(received);

  if (pass) {
    return {
      message: () => `expected ${received} not to be in array ${array}`,
      pass: true,
    };
  }

  return {
    message: () => `expected ${received} to be in array ${array}`,
    pass: false,
  };
};
