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
    MultiAction extends true
      ? Unflat<string, true>
      : string
  >
  & Flag<Flags>
  & Field<Fields, true>
  & Custom
  & (
    Output extends true
      ? PartialRecord<
        "output",
        | boolean
        | string
      >
      : {}
  )
;
