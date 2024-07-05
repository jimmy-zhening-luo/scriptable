declare type ISearchEngineSetting<
  ActionType extends string,
  Output extends boolean = false,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends Record<
    string
    ,
    | string[]
    | string
    | boolean
  > = {}
  ,
  MultipleActions extends boolean = false,
> =
  & Record<
    ActionType
    ,
    MultipleActions extends true
      ?
        | string[]
        | string
      : string
  >
  & (
    Output extends true
      ? {
        output?:
          | ""
          | "write" // any postfix
        ;
      }
      : {}
  )
  & Flag<
    Flags
  >
  & Field<
    Fields
    ,
    true
  >
  & Custom
;
