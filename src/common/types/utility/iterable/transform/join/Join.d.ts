declare type Join<
  A,
  Separator extends string = string,
> = Joinable<
  A
> extends false
  ? never
  : IsTupleful<
    A
  > extends false
    ? string
    : Extract<Flat<A>, stringful | number | boolean> extends never
      ? literalful<Flat<A>> extends never
        ? IsLongTupleful<
          A
        > extends false
          ? string
          : literalful<Separator> extends never
            ? Separator extends stringful
              ? stringful
              : string
            : stringful
        : stringful
      : stringful
;

/*
    : IsLongTupleful<
      A
    > extends true
      ? literalful<Separator> extends never
        ? Separator extends stringful
          ? stringful
          : 1000 // if a single one is not string | Array | null | undefined, then stringful
        : stringful
      : Flat<A> extends number | boolean | stringful | null
        ? 100
        : -1;
*/
type JoinTest = Join<[

  // "a",
  // "b",
  // "c",
  // string,
  "",
  "",
], "black">;
type JoinTest2 = Join<["", "", ""]>;
type JoinTest3 = Joinable<[]>;
type Stringfultest = stringful & { j: true } & string extends stringful ? true : false;
type bongo = stringful extends stringful | string | 10 ? true : false;
