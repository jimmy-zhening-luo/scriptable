declare type Unflat<
  Element = string,
  Readonly extends boolean = false,
> = [Element] extends [never]
  ? never
  : | Element
    | (True<Readonly> extends never
      ? Element[]
      : readonly Element[]);
