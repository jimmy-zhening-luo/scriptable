declare type Unflat<
  Element = string,
  Mutable extends boolean = false,
> = [Element] extends [never]
  ? never
  : | Element
    | (True<Mutable> extends never
      ? readonly Element[]
      : Element[]);
