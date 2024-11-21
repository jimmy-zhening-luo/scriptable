declare type Unflat<
  Element = string,
  Mutable extends boolean = false,
> = [Element] extends [never]
  ? never
  :
    | Element
    | (Truth<Mutable> extends never
      ? readonly Element[]
      : Element[]);
