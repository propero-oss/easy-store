import { createStore } from "src/store";

describe("createStore", () => {
  it("should compose createSubscribable and createStoreAccessors", async () => {
    const { get, set, update, subscribe, unsubscribe } = createStore<unknown>(undefined);
    expect(get).toBeDefined();
    expect(set).toBeDefined();
    expect(update).toBeDefined();
    expect(subscribe).toBeDefined();
    expect(unsubscribe).toBeDefined();
  });

  it("should notify subscribers immediately if configured to do so", async () => {
    const { subscribe } = createStore<unknown>(5, { immediatelyNotify: true });
    const spy = jest.fn();
    subscribe(spy);
    expect(spy).toHaveBeenCalledWith(5);
  });
});
