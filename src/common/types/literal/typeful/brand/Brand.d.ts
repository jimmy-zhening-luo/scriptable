declare const brand: unique symbol;
type Branding<B extends string> = B extends "" ? never : { [brand]: B };

declare type Brand<B extends string, T = string> = T & Branding<B>;
