export type SearchEngineSetting<
  Engine extends string,
  Flags extends string = never,
  Fields extends string = never,
  ExtraProperties extends object = object,
  Action = string,
> = (
  & Record<Engine, Action>
  & (Literalful<Flags> extends never ? object : Flag<Flags>)
  & (Literalful<Fields> extends never ? object : Field<never, Fields>)
  & ExtraProperties
);
