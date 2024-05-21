declare type K = string;

declare type SearchSetting = {
  app: {
    tag: string;
    key: Record<
      | "chat"
      | "translate"
      | "mathShort"
      | "mathLong"
      ,
      string
    >;
  };
  user: {
    alias: Record<
      string,
      K
    >;
    engine: Record<
      string
      ,
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
  & {
    output?: boolean;
  }
;

declare type UrlEngineSetting =
  & EngineProp<
    "url",
    string[]
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
  T = string,
> = Record<
  P
  ,
  | T
  | string
>;
