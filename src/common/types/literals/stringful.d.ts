declare type stringful =
  & Brand<"stringful", string>
  & Head<string & Length<1> & Brand<"stringful", string>>
;
