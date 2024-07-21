declare const valid: unique symbol;
declare type Valid<T extends primitive, Checks extends readonly string[]> =
  & ([T] extends [primitive] ? T : never)
  & (Chain<Checks> extends never ? never : { [valid]: Chain<Checks> })
;
