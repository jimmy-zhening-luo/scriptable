declare type Tuple<N extends number = 2, Element = string> = [Element] extends [never]
  ? never
  : N extends never
    ? never
    : number extends N
      ? readonly Element[]
      : Extract<`${N}`, `-${string}` | `${string}.${string}`> extends never
        ? Tuple.Construct<N, Element>
        : Tuple.Construct<0, Element>;

declare namespace Tuple {
  export type Construct<
    N extends number,
    Element,
    H extends readonly Element[] = readonly [],
  > = H["length"] extends N
    ? H
    : Construct<N, Element, readonly [...H, Element]>;

}
