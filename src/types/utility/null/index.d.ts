declare type Null<T> = T extends never ? never : (null | T);
