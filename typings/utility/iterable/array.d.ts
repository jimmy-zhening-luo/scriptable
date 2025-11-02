declare type ArrayN<
  N extends number = 0,
  Element = string,
  Readonly extends boolean = false,
> = [Element] extends [never]
  ? never
  : [N] extends [never]
      ? never
      : True<Readonly> extends never
        ? ArrayN.Construct<
          Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
            ? N
            : 0,
          Element
        >
        : ArrayN.ConstructReadonly<
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
    ? [
        ...H,
        ...Element[],
      ]
    : Construct<
      N,
      Element,
      [
        ...H,
        Element,
      ]
    >;
  export type ConstructReadonly<
    N extends number,
    Element,
    H extends readonly Element[] = readonly [],
  > = H["length"] extends N
    ? readonly [
      ...H,
      ...(readonly Element[]),
    ]
    : ConstructReadonly<
      N,
      Element,
      readonly [...H, Element]
    >;
}
