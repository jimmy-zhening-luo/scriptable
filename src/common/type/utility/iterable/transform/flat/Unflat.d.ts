declare type Unflat<I = string, RO = true> =
  | I
  | (RO extends false ? I[] : readonly I[])
;
