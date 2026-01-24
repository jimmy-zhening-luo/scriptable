declare type Unflat<
  T = string,
  Readonly extends boolean = false,
> = [T] extends [never]
  ? never
  : | T
    | (True<Readonly> extends never
      ? T[]
      : readonly T[]);
