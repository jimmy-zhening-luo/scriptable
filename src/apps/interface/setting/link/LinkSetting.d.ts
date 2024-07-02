declare type LinkSetting = {
  user: {
    host:
      & List<
        "www"
      >
      & Record<
        "swap"
        ,
        FieldTable
      >
    ;
    query:
      & List<
        "omit"
      >
      & Record<
        | "include"
        | "exclude"
        ,
        ListTable
      >
    ;
    fragment: List<
      "trim"
    >;
  };
};
