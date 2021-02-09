import { Destroyable, MutableStore, ReadOnlyStore } from "src/store/types";

export function createStorePropertyAccessor<T, Key extends keyof T>(
  store: ReadOnlyStore<T> & Partial<MutableStore<T>>,
  target: unknown,
  key: Key
): void {
  const { getValue, update } = store;
  Object.defineProperty(target, key, {
    get: () => getValue()[key],
    set: update ? (value) => update!((current) => ({ ...current, [key]: value })) : undefined,
    enumerable: Object.getOwnPropertyDescriptor(store.getValue(), key)?.enumerable ?? true,
    configurable: true,
  });
}

export function createStoreProxy<T extends Record<string, unknown>>(
  store: ReadOnlyStore<T>
): { value: T } & Destroyable {
  const value = Object.create(null) as T;
  const handler = (newVal: T, oldVal: T): void => {
    const keysBefore = Object.keys(oldVal);
    const keysAfter = Object.keys(newVal);

    for (const key of keysBefore) if (!keysAfter.includes(key)) delete value[key];
    for (const key of keysAfter)
      if (!keysBefore.includes(key)) createStorePropertyAccessor(store, value, key);
  };
  store.sub(handler);
  handler(store.getValue(), {} as any);
  const destroy = (): void => store.unsub(handler);
  return { value, destroy };
}
