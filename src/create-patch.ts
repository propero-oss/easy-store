import {
  PatchFunction,
  StoreGetter,
  StorePatcher,
  StoreSetter,
} from "src/types";

export function createPatch<T>(
  get: StoreGetter<T>,
  set: StoreSetter<T>
): StorePatcher<T> {
  return function patch(
    partial: Partial<T> | PatchFunction<T>
  ): void | Promise<void> {
    if (typeof partial === "function")
      return Promise.resolve((partial as PatchFunction<T>)(get())).then(patch);
    set({ ...get(), ...partial } as any);
  } as any;
}
