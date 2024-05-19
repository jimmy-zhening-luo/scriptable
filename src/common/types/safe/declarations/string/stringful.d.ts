declare type stringful =
  & Safe<
    string,
    "stringful"
  >
  & Head<
    & Safe<
      string,
      "stringful"
    >
    & Length<1>
  >
;
