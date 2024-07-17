declare type Limit<K extends string, OK extends string = never> = Property<K, OK, Boundary>;

type Boundary = Recordful<
  | "min"
  | "max"
  ,
  number
>;
