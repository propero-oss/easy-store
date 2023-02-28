export type ArrayOr<T> = T | T[];
export type PromiseOr<T> = T | Promise<T>;
export type Subscriber<T extends unknown[]> = (...params: T) => void;
export type SubscribeFunction<T extends unknown[]> = (
  listeners: ArrayOr<Subscriber<T>>
) => () => void;
export type NotifyFunction<T extends unknown[]> = (...value: T) => void;

export interface SubscribableOptions {
  maxListeners?: number;
}

export interface Subscribable<T extends unknown[]> {
  subscribe: SubscribeFunction<T>;
}

export interface Notifiable<T extends unknown[]> {
  notify: NotifyFunction<T>;
}

export interface StoreOptions extends SubscribableOptions {
  immediatelyNotify?: boolean;
}

export interface StoreMethods<T> {
  get(): T;
  set(value: T): void;
  set(updater: UpdateFunction<T>): Promise<void>;
  patch(value: Partial<T>): void;
  patch(patcher: PatchFunction<T>): Promise<void>;
}

export type UpdateFunction<T> = (value: T) => PromiseOr<T>;
export type PatchFunction<T> = (value: T) => PromiseOr<Partial<T>>;
export type StoreSubscriber<T> = (newValue: T, oldValue?: T) => void;
export type StoreSubscribeFunction<T> = SubscribeFunction<
  [newValue: T, oldValue?: T]
>;
export type StoreGetter<T> = StoreMethods<T>["get"];
export type StoreSetter<T> = StoreMethods<T>["set"];
export type StorePatcher<T> = StoreMethods<T>["patch"];

export interface Destroyable {
  destroy(): void;
}
export interface ReadonlyStore<T> {
  get: StoreGetter<T>;
  subscribe: StoreSubscribeFunction<T>;
}

export interface PatchableStore<T> {
  patch: StorePatcher<T>;
}

export interface WritableStore<T> {
  set: StoreSetter<T>;
}

export interface AccessibleStore<T> {
  get value(): T;
  set value(val: T);
}

export type StoreValues<
  T extends ReadonlyStore<any>[] | ReadonlyArray<ReadonlyStore<any>>
> = T extends [ReadonlyStore<infer T0>]
  ? [T0]
  : T extends [ReadonlyStore<infer T0>, ReadonlyStore<infer T1>]
  ? [T0, T1]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>
    ]
  ? [T0, T1, T2]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>
    ]
  ? [T0, T1, T2, T3]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>,
      ReadonlyStore<infer T4>
    ]
  ? [T0, T1, T2, T3, T4]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>,
      ReadonlyStore<infer T4>,
      ReadonlyStore<infer T5>
    ]
  ? [T0, T1, T2, T3, T4, T5]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>,
      ReadonlyStore<infer T4>,
      ReadonlyStore<infer T5>,
      ReadonlyStore<infer T6>
    ]
  ? [T0, T1, T2, T3, T4, T5, T6]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>,
      ReadonlyStore<infer T4>,
      ReadonlyStore<infer T5>,
      ReadonlyStore<infer T6>,
      ReadonlyStore<infer T7>
    ]
  ? [T0, T1, T2, T3, T4, T5, T6, T7]
  : T extends [
      ReadonlyStore<infer T0>,
      ReadonlyStore<infer T1>,
      ReadonlyStore<infer T2>,
      ReadonlyStore<infer T3>,
      ReadonlyStore<infer T4>,
      ReadonlyStore<infer T5>,
      ReadonlyStore<infer T6>,
      ReadonlyStore<infer T7>,
      ReadonlyStore<infer T8>
    ]
  ? [T0, T1, T2, T3, T4, T5, T6, T7, T8]
  : {
      [Key in keyof T]: T[Key] extends ReadonlyStore<infer V> ? V : never;
    };
