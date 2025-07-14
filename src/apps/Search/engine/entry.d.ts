export type ISearchEngineEntry<
  Engine extends string,
  Flags extends string = never,
  Fields extends string = never,
  Action = string,
> = (
  & ReadonlyRecord<Engine, Action>
  & {
    readonly prepend: string;
    readonly noSave: boolean;
  }
  & (Literalful<Flags> extends never ? object : Readonly<Flag<Flags>>)
  & (Literalful<Fields> extends never ? object : Readonly<Field<never, Fields>>)
);
