import { randomPick } from "../../helpers/common";
import toBeInArray from "../../../jest-custom-matchers/toBeInArray";

expect.extend({
  toBeInArray,
});

test("randomPick() should be an item from the list", () => {
  const list = ["Sherlock", "Watson", "Moriarty", "Molly", "Mary"];
  const randomValue = randomPick(list);

  expect(randomValue).toBeInArray(list);
});
