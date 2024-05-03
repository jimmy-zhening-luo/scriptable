declare const charstring: unique symbol;
declare type CString<Brand extends string> = { [charstring]: Brand };
