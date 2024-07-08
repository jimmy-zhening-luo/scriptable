declare const Guid: unique symbol;
declare type Guid<
  Radix extends number,
> =
  & stringful
  & { [Guid]: `base${Radix}` };
