import { createSubscribable, SubscriberLimitExceededError } from "src/subscribable";

describe("createSubscribable", () => {
  it("should create subscribe, unsubscribe and notify methods", async () => {
    const { sub, unsub, notify } = createSubscribable<unknown[]>();
    expect(sub).toBeDefined();
    expect(unsub).toBeDefined();
    expect(notify).toBeDefined();
  });

  it("should inform subscribed parties if notify is called", async () => {
    const params = ["apple", 2, { foo: "bar" }];
    const { sub, notify } = createSubscribable<unknown[]>();
    const spy = jest.fn();
    sub(spy);
    notify(...params);
    expect(spy).toHaveBeenCalledWith(...params);
  });

  it("should no longer inform unsubscribed parties", async () => {
    const { sub, unsub, notify } = createSubscribable<unknown[]>();
    const spy = jest.fn();
    sub(spy);
    unsub(spy);
    notify("apple", 2, { foo: "bar" });
    expect(spy).not.toHaveBeenCalled();
  });

  it("should throw if too many subscribers have been attached", async () => {
    const { sub } = createSubscribable<unknown[]>({ limit: 3 });
    const register = () => sub(() => null);
    register();
    register();
    register();
    expect(register).toThrow(SubscriberLimitExceededError);
  });
});
