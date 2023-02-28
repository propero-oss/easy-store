import { createStoreSubscribe } from "src/create-store-subscribe";

describe("createStoreSubscribe", () => {
  it("should create a subscribe method", async () => {
    const subscribe = createStoreSubscribe(jest.fn(), jest.fn());
    expect(subscribe).toBeDefined();
  });

  it("should return the subscribe method as is if immediatelyNotify is false", async () => {
    const sub = jest.fn();
    expect(createStoreSubscribe(sub, jest.fn(), false)).toBe(sub);
  });

  it("should immediately notify subscribers if applicable", async () => {
    const sub = jest.fn();
    const get = () => "foo";
    const listener = jest.fn();
    createStoreSubscribe(sub, get, true)(listener);
    expect(listener).toHaveBeenCalledWith("foo");
    expect(sub).toHaveBeenCalledWith([listener]);
  });
});
