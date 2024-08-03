declare const directory: unique symbol;
declare type directory<T extends string> = T & { [directory]: true };
