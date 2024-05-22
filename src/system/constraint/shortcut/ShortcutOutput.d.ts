declare type ShortcutOutput =
  | string
  | Table<
    | ShortcutTableValue
    | Table<
      | ShortcutTableValue
      | Table<
        | ShortcutTableValue
        | Table<
          | ShortcutTableValue
          >
        >
      >
    >
  >
;

type ShortcutTableValue =
  | string
  | string[]
;
