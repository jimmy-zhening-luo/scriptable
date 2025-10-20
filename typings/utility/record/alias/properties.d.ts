declare type Field<
  Key extends string,
  Optional extends string = never,
> = Property<
  Key,
  Optional,
  string
>;
declare type Fieldful<
  Key extends string,
  Optional extends string = never,
> = Property<
  Key,
  Optional,
  stringful
>;
declare type Flag<
  Optional extends string,
  Key extends string = never,
> = Property<
  Key,
  Optional,
  boolean
>;
declare type List<
  Key extends string,
  Optional extends string = never,
> = Property<
  Key,
  Optional,
  readonly string[]
>;
declare type Listish<
  Key extends string,
  Optional extends string = never,
  Mutable extends boolean = false,
> = Property<
  Key,
  Optional,
  Unflat<
    string,
    Mutable
  >
>;
declare type Scalar<
  Key extends string,
  Optional extends string = never,
> = Property<
  Key,
  Optional,
  number
>;
