import { createStore, deriveStore } from "src/store";

describe("deferStore", () => {
  it("should create a readonly, destroyable store", async () => {
    const { sub, unsub, getValue, destroy } = deriveStore([], () => undefined);
    expect(sub).toBeDefined();
    expect(unsub).toBeDefined();
    expect(getValue).toBeDefined();
    expect(destroy).toBeDefined();
  });

  it("should calculate its initial value", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    expect(derived.getValue()).toEqual(5);
    derived.destroy();
  });

  it("should notify parties if any of the depended uppon stores change their value", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    const spy = jest.fn();
    derived.sub(spy);
    store1.setValue(1);
    expect(spy).toHaveBeenCalledWith(2, 5);
    store2.setValue(-1);
    expect(spy).toHaveBeenLastCalledWith(1, 2);
    derived.destroy();
  });

  it("should no longer notify parties after destroy() was called", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    const spy = jest.fn();
    derived.sub(spy);
    derived.destroy();
    store1.setValue(10);
    expect(spy).not.toHaveBeenCalled();
  });
});
