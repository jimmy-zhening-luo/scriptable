declare type Field<
  Key extends RecordKey,
  Option extends RecordKey = never,
> = Property<
  string,
  Key,
  Option
>;
declare type Fieldful<
  Key extends RecordKey,
  Option extends RecordKey = never,
> = Property<
  stringful,
  Key,
  Option
>;
declare type Flag<
  Option extends RecordKey,
  Key extends RecordKey = never,
> = Property<
  boolean,
  Key,
  Option
>;
declare type List<
  Key extends RecordKey,
  Option extends RecordKey = never,
> = Property<
  readonly string[],
  Key,
  Option
>;
declare type Listish<
  Key extends RecordKey,
  Option extends RecordKey = never,
  Mutable extends boolean = false,
> = Property<
  Unflat<string, Mutable>,
  Key,
  Option
>;
declare type Scalar<
  Key extends RecordKey,
  Option extends RecordKey = never,
> = Property<
  number,
  Key,
  Option
>;
