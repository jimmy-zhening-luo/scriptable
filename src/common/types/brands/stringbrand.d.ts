declare const stringbrand: unique symbol;

type StringBranding<B> = { [stringbrand]: B };

declare type StringBrand<B, T extends string = string> = T & StringBranding<B>;
