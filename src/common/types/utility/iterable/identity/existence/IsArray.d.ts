declare type IsArray<
  A,
> = Flat<
  A
> extends never
  ? A extends unknown[]
    ? true
    : A extends readonly unknown[]
      ? true
      : false
  : true;
