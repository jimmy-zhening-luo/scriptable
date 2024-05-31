declare type Join<
  Iterable,
  Separator extends string = string,
> = Joinable<
  Iterable
> extends false
  ? never
  : IsArrayful<
    Iterable
  > extends false
    ? string
    : Extract<
      Flat<
        Iterable
      >
      ,
      | stringful
    > extends never
      ? Extract<
        Flat<
          Iterable
        >
        ,
        | number
        | boolean
      > extends never
        ? literalful<
          Flat<
            Iterable
          >
        > extends never
          ? IsLongTupleful<
            Iterable
          > extends false
            ? string
            : literalful<
              Separator
            > extends never
              ? Separator extends stringful
                ? stringful
                :
                  | string
                  | stringful
              : stringful
          : stringful
        : stringful
      : Exclude<
        Flat<
          Iterable
        >
        , stringful
      > extends never
        ? Flat<
          Iterable
        >
        : stringful;

type JTest = IsArray<never[]>;
