declare interface ShortcutConfigProto {
  app?: Setting,
  user?: Setting
}

declare interface Setting {
  [key: string]: SettingValue
}

declare type SettingValue =
  | string
  | number
  | boolean
  | Setting
  | SettingValue[];
