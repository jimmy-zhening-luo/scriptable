declare type ArrayN<
  Length extends number = 0,
  T = string,
  Readonly extends boolean = false,
> = [T] extends [never]
  ? never
  : [Length] extends [never]
      ? never
      : Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
        ? True<Readonly> extends never
          ? ArrayN.Construct<Length, T>
          : ArrayN.ConstructReadonly<Length, T>
        : True<Readonly> extends never
          ? ArrayN.Construct<0, T>
          : ArrayN.ConstructReadonly<0, T>;

declare namespace ArrayN {
  export type Construct<
    Length extends number,
    T,
    This extends T[] = [],
  > = This["length"] extends Length
    ? [
        ...This,
        ...T[],
      ]
    : Construct<
      Length,
      T,
      [
        ...This,
        T,
      ]
    >;
  export type ConstructReadonly<
    Length extends number,
    T,
    This extends readonly T[] = readonly [],
  > = This["length"] extends Length
    ? readonly [
      ...This,
      ...(readonly T[]),
    ]
    : ConstructReadonly<
      Length,
      T,
      readonly [...This, T]
    >;
}
