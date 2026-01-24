declare type Field<
  K extends Key,
  Option extends Key = never,
> = Property<
  string,
  K,
  Option
>;

declare type Fieldful<
  K extends Key,
  Option extends Key = never,
> = Property<
  stringful,
  K,
  Option
>;

declare type Flag<
  Option extends Key,
  K extends Key = never,
> = Property<
  boolean,
  K,
  Option
>;

declare type List<
  K extends Key,
  Option extends Key = never,
> = Property<
  readonly string[],
  K,
  Option
>;

declare type Listish<
  K extends Key,
  Option extends Key = never,
  Mutable extends boolean = false,
> = Property<
  Unflat<string, Mutable>,
  K,
  Option
>;

declare type Scalar<
  K extends Key,
  Option extends Key = never,
> = Property<
  number,
  K,
  Option
>;
