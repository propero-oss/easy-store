import { createGetSet } from "src/create-get-set";

describe("createGetSet", () => {
  it("should create a getter and a setter for a given value and notify function", async () => {
    const notify = jest.fn();
    const [get, set] = createGetSet<number>(5, notify);
    expect(get).toBeDefined();
    expect(set).toBeDefined();
  });

  it("should be initialised to the given initial value", async () => {
    const notify = jest.fn();
    const [get] = createGetSet<number>(5, notify);
    expect(get()).toBe(5);
  });

  it("should allow setting of the value", async () => {
    const notify = jest.fn();
    const [get, set] = createGetSet<number>(5, notify);
    set(10);
    expect(get()).toBe(10);
  });

  it("should allow updating the value", async () => {
    const notify = jest.fn();
    const [get, set] = createGetSet<number>(5, notify);
    await set((val) => val + 10);
    expect(get()).toBe(15);
  });

  it("should notify on change", async () => {
    const notify = jest.fn();
    const [, set] = createGetSet<number>(5, notify);
    expect(notify).not.toHaveBeenCalled();
    set(10);
    expect(notify).toHaveBeenCalledWith(10, 5);
    await set((val) => val + 10);
    expect(notify).toHaveBeenLastCalledWith(20, 10);
  });
});
