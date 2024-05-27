declare type LinkSetting = {
  user: {
    host:
      & List<
        "keepWww"
      >
      & Record<
        "swapHost"
        ,
        FieldTable
      >
    ;
    query: Record<
      "keepQueryParam"
      ,
      ListTable
    >;
    fragment: List<
      "omitFragment"
    >;
  };
};
