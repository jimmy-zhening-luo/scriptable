// TODO: constrain to positive integer
declare type ArrayN<I, N extends number = 0> = [I] extends [never]
  ? never
  : N extends number
    ? N extends 0
      ? [...I[]]
      : ArrayBuilder<I, N>
    : never;

type ArrayBuilder<I, N extends number, H extends I[] = []> = H["length"] extends N
  ? [...H, ...I[]]
  : ArrayBuilder<I, N, [...H, I]>;
