declare const Guid: unique symbol;
declare type Guid<
  Radix extends string,
> =
  & stringful
  & { [Guid]: Radix };
