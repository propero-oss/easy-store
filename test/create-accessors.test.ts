import { createAccessors } from "src/create-accessors";

describe("createAccessors", () => {
  it("should create get and set properties on an object", async () => {
    const get = jest.fn();
    const set = jest.fn();
    const obj = createAccessors({}, get, set);
    expect(Object.getOwnPropertyDescriptor(obj, "value")).toEqual({
      get,
      set,
      enumerable: true,
      configurable: true,
    });
  });
});
