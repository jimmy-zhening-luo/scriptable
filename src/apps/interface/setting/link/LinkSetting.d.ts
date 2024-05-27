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
    query: List<
      "keepQuery"
    >;
    fragment: List<
      "omitFragment"
    >;
  };
};
