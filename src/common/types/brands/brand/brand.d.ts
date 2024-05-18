declare const brand: unique symbol;

type Branding<B> = { [brand]: B };

declare type Brand<B, T> = T & Branding<B>;
