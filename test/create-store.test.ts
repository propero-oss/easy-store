import { createStore } from "src/create-store";

describe("createStore", () => {
  it("should create a store", async () => {
    const store = createStore(
      { foo: "bar" },
      {
        immediatelyNotify: true,
      }
    );
    expect(store).toBeDefined();
  });
});
