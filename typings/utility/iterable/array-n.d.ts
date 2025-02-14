declare type ArrayN<N extends number = 0, Element = string> = [Element] extends [never]
  ? never
  : [N] extends [never]
      ? never
      : ArrayN.Construct<
        Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
          ? N
          : 0,
        Element
      >;

declare namespace ArrayN {
  export type Construct<
    N extends number,
    Element,
    H extends Element[] = [],
  > = H["length"] extends N
    ? [...H, ...Element[]]
    : Construct<
      N,
      Element,
      [...H, Element]
    >;
}
