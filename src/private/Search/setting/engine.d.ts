export type ISearchEngine<
  Engine extends string,
  Flags extends string = never,
  Fields extends string = never,
  Action = string,
>
= & Record<Engine, Action>
  & Flag<
    | Flags
    | "noSave"
  >
  & Field<
    never,
    | Fields
    | "prepend"
    | "separator"
  >;
