export type ISearchEngineEntry<
  Engine extends string,
  Flags extends string = never,
  Fields extends string = never,
  Action = string,
>
 = & ReadonlyRecord<Engine, Action>
   & {
     readonly prepend: string;
     readonly noSave: boolean;
   }
   & Readonly<Flag<Flags>>
   & Readonly<Field<never, Fields>>;
