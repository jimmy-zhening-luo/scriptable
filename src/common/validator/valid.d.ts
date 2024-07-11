declare const valid: unique symbol;
declare type Valid<T, Validators extends string[]> = T & { [valid]: Chain<Validators> };
