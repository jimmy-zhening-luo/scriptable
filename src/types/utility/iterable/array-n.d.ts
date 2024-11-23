declare type ArrayN<N extends number = 0, Element = string> = [Element] extends [never]
  ? never
  : [N] extends [never]
      ? never
      : Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
        ? [0] extends [N]
            ? Element[]
            : ArrayN.Construct<N, Element>
        : Element[];

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
