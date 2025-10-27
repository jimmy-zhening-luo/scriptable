declare type ArrayN<
  N extends number = 0,
  Element = string,
  Mutable extends boolean = false,
> = [Element] extends [never]
  ? never
  : [N] extends [never]
      ? never
      : True<Mutable> extends never
        ? ArrayN.Construct<
          Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
            ? N
            : 0,
          Element
        >
        : ArrayN.ConstructMutable<
          Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
            ? N
            : 0,
          Element
        >;

declare namespace ArrayN {
  export type Construct<
    N extends number,
    Element,
    H extends readonly Element[] = readonly [],
  > = H["length"] extends N
    ? readonly [
      ...H,
      ...(readonly Element[]),
    ]
    : Construct<
      N,
      Element,
      readonly [...H, Element]
    >;
  export type ConstructMutable<
    N extends number,
    Element,
    H extends Element[] = [],
  > = H["length"] extends N
    ? [
        ...H,
        ...Element[],
      ]
    : ConstructMutable<
      N,
      Element,
      [
        ...H,
        Element,
      ]
    >;
}
