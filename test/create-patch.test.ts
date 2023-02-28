import { createPatch } from "src/create-patch";

describe("createPatch", () => {
  it("should create a patch method", async () => {
    const patch = createPatch(
      () => 5,
      (val) => void val as any
    );
    expect(patch).toBeDefined();
  });

  it("should apply a partial patch to an object", async () => {
    const obj: Record<string, any> = { foo: "bar" };
    const update = jest.fn();
    const patch = createPatch(() => obj, update);
    patch({ bar: "foo" });
    expect(update).toHaveBeenCalledWith({ foo: "bar", bar: "foo" });
  });

  it("should apply a partial patch returned by a patch function", async () => {
    const obj: Record<string, any> = { foo: "bar" };
    const update = jest.fn();
    const patch = createPatch<Record<string, any>>(() => obj, update);
    await patch((val: Record<string, any>) => ({ bar: "foo" + val.foo }));
    expect(update).toHaveBeenCalledWith({ foo: "bar", bar: "foobar" });
  });
});
