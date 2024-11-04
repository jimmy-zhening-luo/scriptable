declare type SearchEngineSetting<
  Key extends string,
  Flags extends string = never,
  Fields extends string = never,
  ExtraProperty extends object = object,
  Value = string,
> =
  & Record<Key, Value>
  & (literalful<Flags> extends never ? object : Flag<Flags>)
  & (literalful<Fields> extends never ? object : Field<never, Fields>)
  & ExtraProperty
;
