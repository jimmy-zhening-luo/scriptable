declare type ReadonlyRecord<K extends string | number | symbol, V> = Readonly<Record<K, V>>;
declare type ReadonlyRecordful<K extends string, V> = Readonly<Recordful<K, V>>;
