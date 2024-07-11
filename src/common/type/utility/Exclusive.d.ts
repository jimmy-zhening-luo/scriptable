declare type Exclusive<A, B> = A extends never
  ? false
  : Exclude<A, B> extends never
    ? true
    : false;
