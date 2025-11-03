declare type Unflat<
  Member = string,
  Readonly extends boolean = false,
> = [Member] extends [never]
  ? never
  : | Member
    | (True<Readonly> extends never
      ? Member[]
      : readonly Member[]);
