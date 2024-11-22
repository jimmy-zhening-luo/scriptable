// WIP
declare type ArrayN<N extends number = 0, Element = string> = [Element] extends [never]
  ? never
  : [N] extends [never]
      ? never
      : [N] extends [number]
          ? [number] extends [N]
              ? [...Element[]]
              : `${N}` extends `${0}` | `-${string}` | `${string}.${string}`
                ? [...Element[]]
                : ArrayN.Construct<N, Element>
          : never;

declare namespace ArrayN {
  export type Construct<N extends number, Element, H extends Element[] = []> = H["length"] extends N
    ? [...H, ...Element[]]
    : Construct<N, Element, [...H, Element]>;

}
