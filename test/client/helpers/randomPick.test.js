import { randomPick } from "client/helpers/common";

test("randomPick() should be an item from the list", () => {
  const list = ["Sherlock", "Watson", "Moriarty", "Molly", "Mary"];
  const randomValue = randomPick(list);

  expect(randomValue).toBeInArray(list);
});
