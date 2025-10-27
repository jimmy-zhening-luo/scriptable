declare type base64char
= | alpha
  | digit
  | "+"
  | "/";

declare type base64pad = "=";

declare type base64charpad
= | base64char
  | base64pad;
