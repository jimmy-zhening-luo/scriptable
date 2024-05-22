declare type NonUndefined<
  O,
> = O extends undefined
  ? never
  : O;
