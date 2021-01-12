import { isPromise } from "src/util";
import * as everything from "src/index";

describe("isPromise", () => {
  it("should return true for promise-like values", async () => {
    expect(isPromise(Promise.resolve())).toBeTruthy();
    expect(isPromise({ then: () => null })).toBeTruthy();
  });

  it("should return false for non promise-like values", async () => {
    expect(isPromise(false)).toBeFalsy();
    expect(isPromise(null)).toBeFalsy();
    expect(isPromise(22)).toBeFalsy();
    expect(isPromise({})).toBeFalsy();
    expect(isPromise(() => null)).toBeFalsy();
  });
});

describe("index", () => {
  it("should exports its members", () => {
    expect(everything).toBeDefined();
  });
});
