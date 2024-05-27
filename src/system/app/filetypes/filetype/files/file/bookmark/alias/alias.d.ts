declare const bookmarked: unique symbol;

declare type Alias =
  & stringful
  & { [bookmarked]: true }
;
