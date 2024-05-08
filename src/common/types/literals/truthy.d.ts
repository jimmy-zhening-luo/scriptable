declare const truthy: unique symbol;
declare type Truthy<T> = T & { [truthy]: true };