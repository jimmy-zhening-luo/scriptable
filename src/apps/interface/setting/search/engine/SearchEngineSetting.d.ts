declare type SearchEngineSetting<
  ActionType extends string,
  Output = false,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends Record<
    string,
    | string[]
    | string
    | boolean
  > = {},
  MultiAction = false,
> =
  & Record<
    ActionType,
    MultiAction extends false ? string : Unflat<string, false>
  >
  & Flag<Flags>
  & Field<never, Fields>
  & Custom
  & (
    Output extends false
      ? {}
      : Particord<
        "output",
        string | boolean
      >
  )
;
