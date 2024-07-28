declare const fs: unique symbol;
declare type fs<S extends string> = S & { [fs]: true };
