import { createStore } from "src/create-store";
import { deriveStore } from "src/derive-store";

describe("deriveStore", () => {
  it("should create a store with derived values", async () => {
    const a = createStore(1);
    const b = createStore(2);
    const derived = deriveStore([a, b], (a, b) => a + b);
    expect(derived.get()).toEqual(3);
    b.set(5);
    expect(derived.get()).toEqual(6);
  });
  it("should support asynchronously deriving values", async () => {
    const a = createStore(1);
    const b = createStore(2);
    const derived = deriveStore(
      [a, b],
      async (a, b) => {
        await sleep(10);
        return a + b;
      },
      0
    );
    expect(derived.get()).toEqual(0);
    await sleep(20);
    expect(derived.get()).toEqual(3);
    a.set(5);
    await sleep(20);
    expect(derived.get()).toEqual(7);
  });
  it("should be destroyable (unregister updates)", async () => {
    const a = createStore(10);
    const derived = deriveStore([a], (a) => a + 10);
    expect(derived.get()).toEqual(20);
    derived.destroy();
    a.set(20);
    expect(derived.get()).toEqual(20);
  });
  it("should infer types from store arguments", async () => {
    const x = createStore(10);
    const y = createStore(10);
    const desc = createStore("X times Y is Z");
    const derived = deriveStore([x, y, desc] as const, (x, y, desc) => {
      const z = x * y;
      return desc
        .replace("X", x.toString())
        .replace("Y", y.toString())
        .replace("Z", z.toString());
    });
    expect(derived.get()).toEqual("10 times 10 is 100");
  });
});

function sleep(ms: number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Promise((resolve) => setTimeout(resolve, ms));
}
