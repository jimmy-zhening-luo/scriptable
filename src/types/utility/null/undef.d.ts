declare type Undef<T> = T extends never ? never : (undefined | T);
