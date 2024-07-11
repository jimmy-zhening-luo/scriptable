declare type ISearchEngineSetting<
  ActionType extends string,
  Output extends boolean = false,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends Record<
    string,
    | string[]
    | string
    | boolean
  > = {},
  MultiAction extends boolean = false,
> =
  & Record<
    ActionType,
    MultiAction extends false ? string : Unflat<string, false>
  >
  & Flag<Flags>
  & Field<Fields, true>
  & Custom
  & (
    Output extends true
      ? PartialRecord<
        "output",
        string | boolean
      >
      : {}
  )
;
