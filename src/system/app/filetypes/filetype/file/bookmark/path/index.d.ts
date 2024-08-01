declare const inner: unique symbol;
declare type filepath<I extends readonly filenode[]> = ArrayType<I> extends never
  ? never
  : I extends readonly filenode[]
    ? (string & { [inner]: Flat<I> })
    : never;
