declare type hexchar
= | digit
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f";

declare type HEXCHAR = Uppercase<hexchar>;
