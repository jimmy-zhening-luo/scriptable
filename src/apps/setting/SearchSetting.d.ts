declare type SearchSettings = {
  app: {
    tag: string;
    key: {
      chat: string;
      translate: string;
      math?: string[];
    };
  };
  user: {
    key: Record<string, string>;
    engine: SearchEngineSetting[];
  };
};

declare type SearchEngineSetting =
  | AppEngineSetting
  | ShortcutEngineSetting
  | NativeEngineSetting
  | BrowserEngineSetting;

declare type ISearchEngineSetting = {
  keys: string | string[];
};

declare type AppEngineSetting = {
  app: string;
} & ISearchEngineSetting;

declare type ShortcutEngineSetting = {
  shortcut: string;
  output?: boolean;
} & ISearchEngineSetting;

declare type NativeEngineSetting = {
  "native": string;
} & ISearchEngineSetting;

declare type BrowserEngineSetting = {
  url: string | string[];
  browser?: BrowserAction;
  encode?: BrowserEncode;
} & ISearchEngineSetting;

declare type BrowserAction =
  | "api"
  | "force"
  | "default";

declare type BrowserEncode =
  | "%20"
  | "+";
