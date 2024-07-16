declare type SearchEngineSetting<
  ActionType extends string,
  Output extends boolean = false,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends {} = {},
  MultiAction extends boolean = false,
> =
  & Record<
    ActionType,
    (True<MultiAction> extends never ? string : Unflat<string, false>)
  >
  & (literalful<Flags> extends never ? {} : Flag<Flags>)
  & (literalful<Fields> extends never ? {} : Field<never, Fields>)
  & Custom
  & (
    True<Output> extends false
      ? {}
      : Particord<
        "output",
        string | boolean
      >
  )
;
