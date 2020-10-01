import "@testing-library/jest-dom/extend-expect";

expect.extend({
  toBeInArray(received, array) {
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
  },

  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;

    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});
