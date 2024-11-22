declare type Tuple<N extends number = 2, Element = string> = [Element] extends [never]
  ? never
  : N extends number
    ? N extends 0 /* TODO: constrain posint */
      ? readonly []
      : Tuple.Construct<N, Element>
    : never;

declare namespace Tuple {
  export type Construct<N extends number, Element, H extends readonly Element[] = readonly []> = H["length"] extends N
    ? H
    : Construct<N, Element, readonly [...H, Element]>;

}
