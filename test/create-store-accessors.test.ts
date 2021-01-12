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
    const { getValue, setValue, update } = createStoreAccessors<undefined>(notify, undefined);
    expect(getValue).toBeDefined();
    expect(setValue).toBeDefined();
    expect(update).toBeDefined();
  });

  it("should return the current value if getValue is called", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { getValue, setValue } = createStoreAccessors<Foobar>(notify, val1);
    expect(getValue()).toEqual(val1);
    setValue(val2);
    expect(getValue()).toEqual(val2);
  });

  it("should notify interested parties if the value changes", async () => {
    const { notify, sub } = createSubscribable<[Foobar, Foobar]>();
    const { setValue } = createStoreAccessors<Foobar>(notify, val1);
    const spy = jest.fn();
    sub(spy);
    setValue(val2);
    expect(spy).toHaveBeenCalledWith(val2, val1);
  });

  it("should update the store value if an updater has run its course", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { getValue, update } = createStoreAccessors<Foobar>(notify, val1);
    let oldVal: Foobar | undefined = undefined;
    // eslint-disable-next-line
    update((val) => { oldVal = val; return val2; });
    expect(oldVal).toEqual(val1);
    expect(getValue()).toEqual(val2);
  });

  it("should update the store value if an async updater has run its course", async () => {
    const { notify } = createSubscribable<[Foobar, Foobar]>();
    const { getValue, update } = createStoreAccessors<Foobar>(notify, val1);
    const promise = update(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(val2), 100);
        })
    );
    expect(getValue()).toEqual(val1);
    await promise;
    expect(getValue()).toEqual(val2);
  });
});
