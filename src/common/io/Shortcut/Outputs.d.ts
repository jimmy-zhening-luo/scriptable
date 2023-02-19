declare interface ShortcutDictionary {
  [key: string]: DictionaryValue
}

declare type DictionaryValue =
  | string
  | number
  | boolean
  | ListContent
  | ShortcutDictionary;

declare type ListContent =
  | string
  | number
  | boolean
  | ShortcutDictionary
  | ListContent[];
