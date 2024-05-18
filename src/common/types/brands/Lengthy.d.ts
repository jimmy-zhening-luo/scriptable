declare const length: unique symbol;

type Length<L extends number> = { [length]: L };

declare type Lengthy<L extends number, T> = T & Length<L>;
