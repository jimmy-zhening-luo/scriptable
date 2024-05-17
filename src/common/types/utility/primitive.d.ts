declare type primitive =
  | string
  | number
  | boolean
;
declare type numberlike =
  | number
  | bigint
;
declare type primitivelike =
  | primitive
  | numberlike
;
