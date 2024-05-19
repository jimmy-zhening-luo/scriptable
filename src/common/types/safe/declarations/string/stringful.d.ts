declare type stringful =
  & Safe<string, "stringful">
  & Head<
    & string
    & Length<1>
    & Safe<string, "stringful">
  >
;
