declare type Field<
  Key extends RecordKey,
  OptionalKey extends RecordKey = never,
> = Property<
  string,
  Key,
  OptionalKey
>;
declare type Fieldful<
  Key extends RecordKey,
  OptionalKey extends RecordKey = never,
> = Property<
  stringful,
  Key,
  OptionalKey
>;
declare type Flag<
  OptionalKey extends RecordKey,
  Key extends RecordKey = never,
> = Property<
  boolean,
  Key,
  OptionalKey
>;
declare type List<
  Key extends RecordKey,
  OptionalKey extends RecordKey = never,
> = Property<
  readonly string[],
  Key,
  OptionalKey
>;
declare type Listish<
  Key extends RecordKey,
  OptionalKey extends RecordKey = never,
  Mutable extends boolean = false,
> = Property<
  Unflat<string, Mutable>,
  Key,
  OptionalKey
>;
declare type Scalar<
  Key extends RecordKey,
  OptionalKey extends RecordKey = never,
> = Property<
  number,
  Key,
  OptionalKey
>;
