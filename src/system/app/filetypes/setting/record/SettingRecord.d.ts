declare interface SettingRecord {
  [key: string]: SettingValue;
}

declare type SettingValue =
  | string
  | number
  | boolean
  | SettingRecord
  | SettingValue[];
