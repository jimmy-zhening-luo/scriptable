declare const v: unique symbol;
declare type valid<T extends primitive, Validators extends readonly string[]> =
  & ([T] extends [primitive] ? T : never)
  & (Chain<Validators, ":", true> extends never ? never : { [v]: Chain<Validators, ":", true> })
;
