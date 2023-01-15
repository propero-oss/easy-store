import { storeFromSubscribable } from "src/store";
import { createSubscribable } from "src/subscribable";

describe("storeFromSubscribable", () => {
  it("should create a store with the initial provided value", async () => {
    const subscribable = createSubscribable<[string]>();
    const store = storeFromSubscribable(subscribable, ["foo"]);
    expect(store.get()).toEqual(["foo"]);
  });

  it("should update store values on subscribable notify", async () => {
    const subscribable = createSubscribable<[string]>();
    const store = storeFromSubscribable(subscribable, ["foo"]);
    subscribable.notify("bar");
    expect(store.get()).toEqual(["bar"]);
  });

  it("should accept value transformers", async () => {
    const subscribable = createSubscribable<[string]>();
    const store = storeFromSubscribable(subscribable, "foo", (val) => val);
    subscribable.notify("bar");
    expect(store.get()).toEqual("bar");
  });

  it("should no longer accept changed values after destruction", async () => {
    const subscribable = createSubscribable<[string]>();
    const store = storeFromSubscribable(subscribable, ["foo"]);
    store.destroy();
    subscribable.notify("bar");
    expect(store.get()).toEqual(["foo"]);
  });
});
