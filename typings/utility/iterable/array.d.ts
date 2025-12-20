declare type ArrayN<
  Length extends number = 0,
  Member = string,
  Readonly extends boolean = false,
> = [Member] extends [never]
  ? never
  : [Length] extends [never]
      ? never
      : Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
        ? True<Readonly> extends never
          ? ArrayN.Construct<Length, Member>
          : ArrayN.ConstructReadonly<Length, Member>
        : True<Readonly> extends never
          ? ArrayN.Construct<0, Member>
          : ArrayN.ConstructReadonly<0, Member>;

declare namespace ArrayN {
  export type Construct<
    Length extends number,
    Member,
    This extends Member[] = [],
  > = This["length"] extends Length
    ? [
        ...This,
        ...Member[],
      ]
    : Construct<
      Length,
      Member,
      [
        ...This,
        Member,
      ]
    >;
  export type ConstructReadonly<
    Length extends number,
    Member,
    This extends readonly Member[] = readonly [],
  > = This["length"] extends Length
    ? readonly [
      ...This,
      ...(readonly Member[]),
    ]
    : ConstructReadonly<
      Length,
      Member,
      readonly [...This, Member]
    >;
}
