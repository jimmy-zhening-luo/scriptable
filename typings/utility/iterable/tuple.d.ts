declare type NTuple<
  N extends number = 2,
  Element = string,
> = [Element] extends [never]
  ? never
  : N extends never
    ? never
    : number extends N
      ? readonly Element[]
      : Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
        ? NTuple.Construct<N, Element>
        : NTuple.Construct<0, Element>;

declare namespace NTuple {
  export type Construct<
    N extends number,
    Element,
    H extends readonly Element[] = readonly [],
  > = H["length"] extends N
    ? H
    : Construct<
      N,
      Element,
      readonly [
        ...H,
        Element,
      ]
    >;

}
