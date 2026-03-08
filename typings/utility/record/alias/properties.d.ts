declare type Field<
  K extends PropertyKey,
  Option extends PropertyKey = never,
> = Property<
  string,
  K,
  Option
>;

declare type Fieldful<
  K extends PropertyKey,
  Option extends PropertyKey = never,
> = Property<
  stringful,
  K,
  Option
>;

declare type Flag<
  Option extends PropertyKey,
  K extends PropertyKey = never,
> = Property<
  boolean,
  K,
  Option
>;

declare type List<
  K extends PropertyKey,
  Option extends PropertyKey = never,
> = Property<
  readonly string[],
  K,
  Option
>;

declare type Listish<
  K extends PropertyKey,
  Option extends PropertyKey = never,
  Mutable extends boolean = false,
> = Property<
  Unflat<string, Mutable>,
  K,
  Option
>;

declare type Scalar<
  K extends PropertyKey,
  Option extends PropertyKey = never,
> = Property<
  number,
  K,
  Option
>;
