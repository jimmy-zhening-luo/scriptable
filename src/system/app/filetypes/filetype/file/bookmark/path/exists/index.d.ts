declare const exists: unique symbol;
declare type exists<T extends string> = T & { [exists]: true };
