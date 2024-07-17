declare type SearchEngineSetting<
  ActionType extends string,
  Output extends boolean = false,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends object = object,
  MultiAction extends boolean = false,
> =
  & Record<
    ActionType,
    (True<MultiAction> extends never ? string : Unflat<string, false>)
  >
  & (literalful<Flags> extends never ? object : Flag<Flags>)
  & (literalful<Fields> extends never ? object : Field<never, Fields>)
  & Custom
  & (
    True<Output> extends false
      ? object
      : Particord<
        "output",
        string | boolean
      >
  )
;
