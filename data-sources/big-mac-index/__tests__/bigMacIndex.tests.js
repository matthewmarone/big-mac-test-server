/**
 * @jest-environment node
 */

const BigMacIndex = require("./../bigMacIndex");

it("Testing passing invalid country filter", async () => {
  expect.assertions(2);
  await expect(BigMacIndex.getLatestIndex(55)).rejects.toEqual(
    new Error("Expected array for countryFilterArray")
  );
  await expect(BigMacIndex.getLatestIndex("Peru")).rejects.toEqual(
    new Error("Expected array for countryFilterArray")
  );
});