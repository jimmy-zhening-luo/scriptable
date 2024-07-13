declare const int: unique symbol;
declare type Int<N extends number> = N & { [int]: 1 };
