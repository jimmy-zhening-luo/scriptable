declare type Field<K extends string, OK extends string = never> = Property<K, OK, string>;
declare type Flag<OK extends string, K extends string = never> = Property<K, OK, boolean>;
declare type Limit<K extends string, OK extends string = never> = Property<K, OK, Record<"min" | "max", number>>;
declare type List<K extends string, OK extends string = never> = Property<K, OK, readonly string[]>;
declare type Listish<K extends string, OK extends string = never> = Property<K, OK, Unflat>;
declare type Scalar<K extends string, OK extends string = never> = Property<K, OK, number>;
