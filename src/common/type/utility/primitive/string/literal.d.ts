declare type literal<S extends string> = Primeval<S, string>;

type bb = true extends never ? true : false;
