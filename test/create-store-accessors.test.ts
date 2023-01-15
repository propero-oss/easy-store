import { createStoreAccessors } from "src/store";
import { createSubscribable } from "src/subscribable";

interface Foobar {
  foo: string;
  baz: number;
}

describe("createStoreAccessors", () => {
  const val1: Foobar = { foo: "bar", baz: 5 };
  const val2: Foobar = { foo: "qux", baz: 4 };

  it("should create get, set and update accessors", async () => {
    const { notify } = createSubscribable<[undefined]>();
    const { get, set, update } = createStoreAccessors<undefined>(notify, undefined);
    expect(get).toBeDefined();
    expect(set).toBeDefined();
    expect(update).toBeDefined();
  });

  it("should return the current value if getValue is called", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { get, set } = createStoreAccessors<Foobar>(notify, val1);
    expect(get()).toEqual(val1);
    set(val2);
    expect(get()).toEqual(val2);
  });

  it("should notify interested parties if the value changes", async () => {
    const { notify, subscribe } = createSubscribable<[Foobar, Foobar]>();
    const { set } = createStoreAccessors<Foobar>(notify, val1);
    const spy = jest.fn();
    subscribe(spy);
    set(val2);
    expect(spy).toHaveBeenCalledWith(val2, val1);
  });

  it("should update the store value if an updater has run its course", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { get, update } = createStoreAccessors<Foobar>(notify, val1);
    let oldVal: Foobar | undefined = undefined;
    // eslint-disable-next-line
    update((val) => { oldVal = val; return val2; });
    expect(oldVal).toEqual(val1);
    expect(get()).toEqual(val2);
  });

  it("should update the store value if an async updater has run its course", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { get, update } = createStoreAccessors<Foobar>(notify, val1);
    const promise = update(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(val2), 100);
        })
    );
    expect(get()).toEqual(val1);
    await promise;
    expect(get()).toEqual(val2);
  });
});
