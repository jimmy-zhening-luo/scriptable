declare type SettingFlags<
  K extends string
> = K extends K
  ? string extends K
    ? Partial<
      Record<
        K
        ,
        boolean
      >
    >
    : never
  : never;
