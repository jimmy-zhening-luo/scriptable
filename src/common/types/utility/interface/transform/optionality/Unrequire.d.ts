declare type Unrequire<
  Record,
  OptionalKey,
> = OptionalKey extends boolean
  ? OptionalKey extends true
    ? Partial<
      Record
    >
    : Record
  :
    & Omit<
      Record
      ,
      Extract<
        OptionalKey
        ,
        Keys<
          Record
        >
      >
    >
    & Pick<
      Partial<
        Record
      >
      ,
      Extract<
        OptionalKey
        ,
        Keys<
          Record
        >
      >
    >
;
