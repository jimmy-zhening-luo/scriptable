declare type base64char =
  | alpha
  | digit
  | "+"
  | "/"
;

declare type base64pad = "=";

declare type base64paddedchar =
  | base64char
  | base64pad
;
