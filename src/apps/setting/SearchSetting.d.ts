declare type K = string;

declare type SearchSetting = {
  app: {
    tag: string;
    key: {
      chat: K;
      translate: K;
      math?: K[];
    };
  };
  user: {
    alias: Record<string, K>;
    engine: Record<
      string,
      | string
      | string[]
      | InlineEngineSetting
      | NativeEngineSetting
      | ShortcutEngineSetting
      | UrlEngineSetting
    >;
  };
};

declare type InlineEngineSetting = Record<"inline", string>;
declare type NativeEngineSetting = Record<"native", string>;
declare type ShortcutEngineSetting = Record<"shortcut", string> & {
  output?: boolean;
};
declare type UrlEngineSetting = Record<"url", string | string[]> & {
  browser?:
    | "api"
    | "force"
  ;
  encode?:
    | "%20"
  ;
};
