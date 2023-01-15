export type Subscriber<T extends unknown[]> = (...args: T) => void;
export type SubscribableNotify<T extends unknown[]> = (...args: T) => void;

export interface SubscribableOptions {
  limit?: number;
}

export interface StoreOptions extends SubscribableOptions {
  immediatelyNotify?: boolean;
}

export interface Subscribable<T extends unknown[] = unknown[]> {
  subscribe(subscriber: Subscriber<T>): () => void;
  unsubscribe(subscriber: Subscriber<T>): void;
}

export interface Notifiable<T extends unknown[] = unknown[]> {
  notify(...args: T): void;
}

export type SubscribableArgs<T extends Subscribable> = T extends Subscribable<infer Args> ? Args : never;

export type SubscribableValueGenerator<T extends Subscribable, Value> = (...values: SubscribableArgs<T>) => Value;
