declare const guid: unique symbol;
declare type guid<Radix extends number> =
  & stringful
  & { [guid]: `base${Radix}` };
