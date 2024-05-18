declare type stringful =
  & Brand<"stringful", string>
  & Head<stringful & Length<1>>
;
