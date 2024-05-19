declare type stringful =
  & Accept<string, "stringful">
  & Head<
    & string
    & Length<1>
    & Accept<string, "stringful">
  >
;
