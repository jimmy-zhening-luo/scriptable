declare type Join<A extends readonly unknown[], D extends string = string> = ArrayType<A> extends never
  ? never
  : MonadType<A> extends never
    ? string
    : MonadType<A> extends readonly (infer I extends string)[]
      ? [I] extends [stringful]
          ? stringful
          : Extract<I, stringful> extends never
            ? literalful<I> extends never
              ? DyadType<MonadType<A>> extends never
                ? string
                : literalful<D> extends never
                  ? [D] extends [stringful]
                      ? stringful
                      : string
                  : stringful
              : stringful
            : stringful
      : never;
