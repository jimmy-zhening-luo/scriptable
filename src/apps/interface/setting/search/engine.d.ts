declare type SearchEngineSetting<
  ActionType extends string,
  Flags extends string = never,
  Fields extends string = never,
  Custom extends object = object,
  MultiAction extends boolean = false,
> =
  & { [A in ActionType]: True<MultiAction> extends never ? string : Unflat<string, false> }
  & (literalful<Flags> extends never ? object : Flag<Flags>)
  & (literalful<Fields> extends never ? object : Field<never, Fields>)
  & Custom
;
