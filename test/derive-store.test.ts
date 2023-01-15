import { createStore, deriveStore } from "src/store";

describe("deferStore", () => {
  it("should create a readonly, destroyable store", async () => {
    const { subscribe, unsubscribe, get, destroy } = deriveStore([], () => undefined);
    expect(subscribe).toBeDefined();
    expect(unsubscribe).toBeDefined();
    expect(get).toBeDefined();
    expect(destroy).toBeDefined();
  });

  it("should calculate its initial value", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    expect(derived.get()).toEqual(5);
    derived.destroy();
  });

  it("should notify parties if any of the depended uppon stores change their value", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    const spy = jest.fn();
    derived.subscribe(spy);
    store1.set(1);
    expect(spy).toHaveBeenCalledWith(2, 5);
    store2.set(-1);
    expect(spy).toHaveBeenLastCalledWith(1, 2);
    derived.destroy();
  });

  it("should no longer notify parties after destroy() was called", async () => {
    const store1 = createStore(5);
    const store2 = createStore(2);
    const derived = deriveStore([store1, store2], Math.max);
    const spy = jest.fn();
    derived.subscribe(spy);
    derived.destroy();
    store1.set(10);
    expect(spy).not.toHaveBeenCalled();
  });

  /*it("should preserve types of stores", async () => {
    const store1 = createStore("test");
    const store2 = createStore(5);
    const derived = deriveStore([store1, store2], (str, num) => {
      const checkStr: string = str;
      const checkNum: number = num;
    });
  });*/
});
