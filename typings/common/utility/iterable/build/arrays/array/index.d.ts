declare type ArrayN<N extends number = 0, I = string> = [I] extends [never]
  ? never
  : N extends number
    ? N extends 0 /* TODO: constrain posint */
      ? [...I[]]
      : ArrayBuilder<N, I>
    : never;

type ArrayBuilder<N extends number, I, H extends I[] = []> = H["length"] extends N
  ? [...H, ...I[]]
  : ArrayBuilder<N, I, [...H, I]>;
