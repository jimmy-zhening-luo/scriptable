declare const valid: unique symbol;
declare type Valid<T, Checks extends string[]> = T & { [valid]: Chain<Checks> };
