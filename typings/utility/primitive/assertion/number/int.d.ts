declare const int: unique symbol;
declare type int<N extends number = number> = finite<N & { [int]: true }>;
