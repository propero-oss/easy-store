import { createStore, createStorePropertyAccessor, createStoreProxy } from "src/store";

describe("createStorePropertyAccessor", () => {
  it("should create a readonly getter for a readonly store", async () => {
    const { update, setValue, ...store } = createStore({ hello: "world" });
    const proxy: Partial<{ hello: string }> = {};
    createStorePropertyAccessor(store, proxy, "hello");
    expect(proxy.hello).toEqual("world");
    setValue({ hello: "foo" });
    expect(proxy.hello).toEqual("foo");
    expect(() => (proxy.hello = "bar")).toThrow();
  });

  it("should create read and write accessors for a mutable store", async () => {
    const store = createStore({ foo: "bar" });
    const proxy: Partial<{ foo: string }> = {};
    createStorePropertyAccessor(store, proxy, "foo");
    expect(proxy.foo).toEqual("bar");
    proxy.foo = "baz";
    expect(store.getValue().foo).toEqual("baz");
    store.setValue({ foo: "qux" });
    expect(proxy.foo).toEqual("qux");
  });
});

describe("createStoreProxy", () => {
  it("should create accessors for all store value properties", async () => {
    const store = createStore({ foo: "bar" });
    const { value } = createStoreProxy(store);
    expect(value.foo).toEqual("bar");
    store.setValue({ foo: "baz" });
    expect(value.foo).toEqual("baz");
    value.foo = "qux";
    expect(store.getValue().foo).toEqual("qux");
  });

  it("should delete obsolete and create new accessors", async () => {
    type Foo = { foo?: string; bar?: string };
    const store = createStore<Foo>({ foo: "bar" });
    const { value } = createStoreProxy(store);
    expect(Object.getOwnPropertyDescriptor(value, "foo")?.get).toBeDefined();
    store.setValue({ bar: "foo" });
    expect(Object.getOwnPropertyDescriptor(value, "foo")?.get).not.toBeDefined();
    expect(Object.getOwnPropertyDescriptor(value, "bar")?.get).toBeDefined();
  });
});
