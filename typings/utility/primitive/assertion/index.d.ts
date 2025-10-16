declare const full: unique symbol;
declare type Full<
  Type extends primitive,
  Of,
> = Type & { [full]: Of };
