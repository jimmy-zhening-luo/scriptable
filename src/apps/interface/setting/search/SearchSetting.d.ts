declare type SearchSetting = {
  app: {
    tag: string;
    key: Field<
      | "chat"
      | "translate"
      | "mathShort"
      | "mathLong"
    >;
    fallback: Field<
      | "rest"
      | "one"
      | "two"
      | "three"
    >;
  };
  user: {
    alias: FieldTable;
    engine: Table<
      | string
      | string[]
      | InlineEngineSetting
      | FindEngineSetting
      | ShortcutEngineSetting
      | UrlEngineSetting
    >;
  };
};

declare type InlineEngineSetting =
  & EngineProp<
    "inline"
  >
;

declare type FindEngineSetting =
  & EngineProp<
    "find"
  >
;

declare type ShortcutEngineSetting =
  & EngineProp<
    "shortcut"
  >
  & Flag<
    "output"
  >
;

declare type UrlEngineSetting =
  & EngineProp<
    "url"
    ,
    true
  >
  & {
    browser?:
      | "api"
      | "force"
    ;
    encode?:
      | "%20"
    ;
  }
;

type EngineProp<
  P extends string,
  Many extends boolean = false,
> =
  & Flag<
    | "requote"
  >
  & Many extends true
    ? Listish<
      P
    >
    : Field<
      P
    >
;
