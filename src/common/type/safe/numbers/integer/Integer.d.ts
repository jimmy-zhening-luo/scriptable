declare const integer: unique symbol;
declare type Integer<N extends number> = N & { [integer]: 1 };
