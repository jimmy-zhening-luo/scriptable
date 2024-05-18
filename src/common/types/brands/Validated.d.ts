declare const validator: unique symbol;

type ValidatedBy<V extends string> = { [validator]: V };

declare type Validated<V extends string, T> = T & ValidatedBy<V>;
