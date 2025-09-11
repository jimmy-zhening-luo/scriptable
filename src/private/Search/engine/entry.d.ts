export type ISearchEngineEntry<
  EngineType extends string,
  Flags extends string = never,
  Fields extends string = never,
  Action = string,
>
= & Record<EngineType, Action>
  & {
    prepend: string;
    noSave: boolean;
  }
  & Flag<Flags>
  & Field<never, Fields>;
