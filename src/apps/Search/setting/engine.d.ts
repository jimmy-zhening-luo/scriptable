export type SearchEngineSetting<
  Engine extends string,
  Flags extends string = never,
  Fields extends string = never,
  Action = string,
> = (
  & ReadonlyRecord<Engine, Action>
  & Readonly<Field<"prepend">>
  & (Literalful<Flags> extends never ? object : Readonly<Flag<Flags>>)
  & (Literalful<Fields> extends never ? object : Readonly<Field<never, Fields>>)
);
