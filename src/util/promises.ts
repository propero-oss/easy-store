export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return !!(
    value &&
    typeof value === "object" &&
    "then" in value &&
    typeof (value as any)["then"] === "function"
  );
}

export type PromiseIf<
  Method extends (...args: any) => any,
  Type = void
> = ReturnType<Method> extends Promise<unknown> ? Promise<Type> : Type;
