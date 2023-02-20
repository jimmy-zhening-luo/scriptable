declare interface SearchProto extends ShortcutConfigProto {
  app: SearchAppSettings,
  user: SearchUserSettings
}

declare interface SearchAppSettings extends Setting {
  queryTag: string,
  reservedKeys: Key[],
}

declare interface SearchUserSettings extends Setting {
  queryTag: string,
  engineKeys: Key[],
}

declare interface Key extends Setting {
  keys:
  | string
  | string[],
  urls?: string[],
  webview?: boolean,
  app?: SupportedApp,
  shortcut?: string,
}

declare type SupportedApp =
  | "mail"
  | "files"
  | "shortcuts"
  | "bear"
  | "shortcut"
