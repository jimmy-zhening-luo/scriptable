declare type NonUndefined<T> = T extends undefined
  ? never
  : T
;
