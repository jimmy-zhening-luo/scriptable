declare type NTuple<
  Length extends number = 2,
  T = string,
> = [T] extends [never]
  ? never
  : Length extends never
    ? never
    : number extends Length
      ? readonly T[]
      : Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
        ? NTuple.Construct<Length, T>
        : NTuple.Construct<0, T>;

declare namespace NTuple {
  export type Construct<
    Length extends number,
    T,
    This extends readonly T[] = readonly [],
  > = This["length"] extends Length
    ? This
    : Construct<
      Length,
      T,
      readonly [
        ...This,
        T,
      ]
    >;

}
