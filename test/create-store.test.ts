import { createStore } from "src/store";

describe("createStore", () => {
  it("should compose createSubscribable and createStoreAccessors", async () => {
    const { getValue, setValue, update, sub, unsub } = createStore<unknown>(undefined);
    expect(getValue).toBeDefined();
    expect(setValue).toBeDefined();
    expect(update).toBeDefined();
    expect(sub).toBeDefined();
    expect(unsub).toBeDefined();
  });
});
