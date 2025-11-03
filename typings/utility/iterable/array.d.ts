declare type ArrayN<
  Length extends number = 0,
  Member = string,
  Readonly extends boolean = false,
> = [Member] extends [never]
  ? never
  : [Length] extends [never]
      ? never
      : True<Readonly> extends never
        ? ArrayN.Construct<
          Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
            ? Length
            : 0,
          Member
        >
        : ArrayN.ConstructReadonly<
          Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
            ? Length
            : 0,
          Member
        >;

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
