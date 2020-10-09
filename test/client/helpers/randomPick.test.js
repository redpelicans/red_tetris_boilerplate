import { randomPick } from "helpers/common";

test("randomPick() with filled list should be an item from the list", () => {
  const list = ["Sherlock", "Watson", "Moriarty", "Molly", "Mary"];
  const randomValue = randomPick(list);

  expect(randomValue).toBeInArray(list);
});

test("randomPick() with empty list should be undefined", () => {
  const list = [];
  const randomValue = randomPick(list);

  expect(randomValue).toBeUndefined();
});
