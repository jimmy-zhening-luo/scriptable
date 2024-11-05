declare const ful: unique symbol;
declare type Full<Type extends primitive, Brand> = Type & { [ful]: Brand };
