declare type PartialRecord<K extends string | number | symbol, V> = Partial<Record<K, V>>;
declare type PartialRecordful<K extends string, V> = Partial<Recordful<K, V>>;
