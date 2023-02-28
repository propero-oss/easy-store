import type {
  ArrayOr,
  Notifiable,
  Subscribable,
  SubscribableOptions,
} from "src/types";

const tooManyListeners = (count: number) =>
  `Too many listeners registered for subscribable! maximum allowed is ${count}.
Maybe check if you attached listeners inside of a render function, event handler or loop?
In case you need more listeners, try setting the maxListeners option to a higher value.`;
export function createSubscribable<T extends unknown[]>({
  maxListeners = 50,
}: SubscribableOptions = {}): Subscribable<T> & Notifiable<T> {
  const listeners: ((...params: T) => void)[] = [];

  function subscribe(listener: ArrayOr<(...params: T) => void>) {
    const wrapped = Array.isArray(listener) ? [...listener] : [listener];
    if (listeners.length + wrapped.length > maxListeners)
      throw Object.assign(new Error(tooManyListeners(maxListeners)), {
        code: "TOO_MANY_LISTENERS",
      });
    listeners.push(...wrapped);
    return () => {
      for (const listener of wrapped) {
        const index = listeners.lastIndexOf(listener);
        if (index !== -1) listeners.splice(index, 1);
      }
    };
  }

  function notify(...params: T) {
    for (const listener of listeners) listener(...params);
  }

  return { subscribe, notify };
}
