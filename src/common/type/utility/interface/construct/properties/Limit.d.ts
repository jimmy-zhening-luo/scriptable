declare type Limit<
  K,
  OK = never,
> = Property<K, OK, Boundary>;

type Boundary = Recordful<
  | "min"
  | "max"
  ,
  number
>;
