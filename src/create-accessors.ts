import type { AccessibleStore, StoreGetter, StoreSetter } from "src/types";

export function createAccessors<T, Val>(
  obj: Val,
  get: StoreGetter<T>,
  set: StoreSetter<T>
): Val & AccessibleStore<T> {
  Object.defineProperty(obj, "value", {
    get,
    set,
    configurable: true,
    enumerable: true,
  });
  return obj as any;
}
