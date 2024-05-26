declare type ISearchEngineSetting<
  Prop extends string,
  ExtraFlags extends string = never,
  Multi extends boolean = false,
> =
  & Flag<
    | "requote"
    | ExtraFlags
  >
  & (
    Multi extends true
      ? Listish<
        Prop
      >
      : Field<
        Prop
      >
  )
;
