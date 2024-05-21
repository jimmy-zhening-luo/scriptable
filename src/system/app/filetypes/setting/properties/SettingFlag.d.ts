declare type SettingFlag<
  K extends string,
> = K extends K
  ? string extends K
    ? never
    : Partial<
      Record<
        K
        ,
        boolean
      >
    >
  : never;
