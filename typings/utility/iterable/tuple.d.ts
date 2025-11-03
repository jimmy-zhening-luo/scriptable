declare type NTuple<
  Length extends number = 2,
  Member = string,
> = [Member] extends [never]
  ? never
  : Length extends never
    ? never
    : number extends Length
      ? readonly Member[]
      : Extract<`${Length}`, `-${string}` | `${string}.${string}`> extends never
        ? NTuple.Construct<Length, Member>
        : NTuple.Construct<0, Member>;

declare namespace NTuple {
  export type Construct<
    Length extends number,
    Member,
    This extends readonly Member[] = readonly [],
  > = This["length"] extends Length
    ? This
    : Construct<
      Length,
      Member,
      readonly [
        ...This,
        Member,
      ]
    >;

}
