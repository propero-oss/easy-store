import { createSubscribable, SubscriberLimitExceededError } from "src/subscribable";

describe("createSubscribable", () => {
  it("should create subscribescribe, unsubscribescribe and notify methods", async () => {
    const { subscribe, unsubscribe, notify } = createSubscribable<unknown[]>();
    expect(subscribe).toBeDefined();
    expect(unsubscribe).toBeDefined();
    expect(notify).toBeDefined();
  });

  it("should inform subscribescribed parties if notify is called", async () => {
    const params = ["apple", 2, { foo: "bar" }];
    const { subscribe, notify } = createSubscribable<unknown[]>();
    const spy = jest.fn();
    subscribe(spy);
    notify(...params);
    expect(spy).toHaveBeenCalledWith(...params);
  });

  it("should no longer inform unsubscribescribed parties", async () => {
    const { subscribe, unsubscribe, notify } = createSubscribable<unknown[]>();
    const spy = jest.fn();
    subscribe(spy);
    unsubscribe(spy);
    notify("apple", 2, { foo: "bar" });
    expect(spy).not.toHaveBeenCalled();
  });

  it("should throw if too many subscribescribers have been attached", async () => {
    const { subscribe } = createSubscribable<unknown[]>({ limit: 3 });
    const register = () => subscribe(() => null);
    register();
    register();
    register();
    expect(register).toThrow(SubscriberLimitExceededError);
  });
});
