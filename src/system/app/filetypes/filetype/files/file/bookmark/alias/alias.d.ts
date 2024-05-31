declare const bookmark: unique symbol;
declare type Alias =
  & stringful
  & { [bookmark]: true }
;
