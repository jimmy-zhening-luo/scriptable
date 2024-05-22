declare type Unrequire<
  O,
  K,
> = K extends boolean
  ? K extends true
    ? Partial<
      O
    >
    : O
  :
    & Omit<
      O
      ,
      Extract<
        K
        ,
        Keys<
          O
        >
      >
    >
    & Pick<
      Partial<
        O
      >
      ,
      Extract<
        K
        ,
        Keys<
          O
        >
      >
    >
;
