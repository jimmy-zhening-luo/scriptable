declare type FieldTable = Table<string>;
declare type FieldfulTable = Table<stringful>;
declare type FlagTable = Table<boolean>;
declare type ScalarTable = Table<number>;
declare type ListTable = Table<readonly string[]>;
declare type ListishTable<
  Mutable extends boolean = false,
> = Table<
  Unflat<string, Mutable>
>;
