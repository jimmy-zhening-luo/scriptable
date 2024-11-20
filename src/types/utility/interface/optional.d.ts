declare type Optional<R extends object, OK extends string> = Interface<R> extends never
  ? never
  : literalful<OK> extends never
    ? never
    : OK extends keyof R
      ? Omit<Interface<R>, literalful<OK>> & Partial<Pick<Interface<R>, literalful<OK>>>
      : never;
