import { createSubscribable } from "src/create-subscribable";

describe("createSubscribable", () => {
  it("should notify subscribers on notify", async () => {
    const { subscribe, notify } = createSubscribable();
    const callback = jest.fn();
    subscribe(callback);
    notify("foo", "bar", 5, "baz");
    expect(callback).toHaveBeenCalledWith("foo", "bar", 5, "baz");
  });

  it("should unsubscribe handlers", async () => {
    const { subscribe, notify } = createSubscribable();
    const callback = jest.fn();
    const unsubscribe = subscribe(callback);
    unsubscribe();
    notify("foo", "bar", 5, "baz");
    expect(callback).not.toHaveBeenCalled();
  });

  it("should throw if too many listeners have been attached", async () => {
    const { subscribe } = createSubscribable({ maxListeners: 1 });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const sub = () => subscribe(() => {});
    sub();
    expect(sub).toThrow();
  });
});
