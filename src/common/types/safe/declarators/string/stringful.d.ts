declare type stringful =
  & Safe<
    string,
    "stringful"
  >
  & {
    0:
      & stringful
      & Length<
        1
      >;
  }
;
