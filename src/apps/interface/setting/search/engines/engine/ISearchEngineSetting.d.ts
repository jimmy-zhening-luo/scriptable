declare type ISearchEngineSetting<
  Prop extends string,
  ExtraFlags extends string = never,
  OptionalFields extends string = never,
  Multi extends boolean = false,
> =
  & Flag<
    | "requote"
    | ExtraFlags
  >
  & Field<
    OptionalFields
    ,
    true
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
