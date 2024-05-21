declare type ISetting = Partial<
  Record<
    | "app"
    | "user"
    ,
    Record<
      string,
      unknown
    >
  >
>;
