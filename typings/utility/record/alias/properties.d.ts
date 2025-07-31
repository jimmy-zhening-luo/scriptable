declare type Field<
  Key extends string,
  OptionalKey extends string = never,
> = Property<Key, OptionalKey, string>;
declare type Flag<
  OptionalKey extends string,
  Key extends string = never,
> = Property<Key, OptionalKey, boolean>;
declare type List<
  Key extends string,
  OptionalKey extends string = never,
> = Property<Key, OptionalKey, readonly string[]>;
declare type Listish<
  Key extends string,
  OptionalKey extends string = never,
> = Property<Key, OptionalKey, Unflat>;
declare type Scalar<
  Key extends string,
  OptionalKey extends string = never,
> = Property<Key, OptionalKey, number>;
