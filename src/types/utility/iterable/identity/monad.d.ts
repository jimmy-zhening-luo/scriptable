declare type MonadType<A extends readonly unknown[]> = 0 extends ArrayLength<A>
  ? never
  : ArrayType<A>;

declare namespace MonadType {
  export type T0 = MonadType<[1, 1]>;
  export type T1 = MonadType<readonly [1, 1]>;
  export type T2 = MonadType<readonly [1, 1?]>;
  export type T3 = MonadType<readonly [1?, 1?]>;
  export type T4 = MonadType<readonly [1?, 1?]>;
  export type T5 = MonadType<[[]]>;
  export type T6 = MonadType<string[] | int[]>;
  export type T7 = MonadType<(string | int)[]>;
  export type T18 = MonadType<[string] | [5, 10]>;
  export type T8a = MonadType<Tuple<boolean>>;
  export type T8b = MonadType<ArrayN<string, 3>>;
  export type T8c = MonadType<
    | ArrayN<string, 3>
    | Tuple<boolean>
    | [string]
    | [5, 10]
    | [5, 13]
    | readonly [5, 10]
  >;
}

declare namespace NotMonadType {
  export type N12 = MonadType<never>;
  export type N26 = MonadType<[]>;
  export type N27 = MonadType<string[]>;
  export type N28 = MonadType<readonly []>;
  export type N29 = MonadType<readonly string[]>;
  export type N30 = MonadType<[5] | []>;
  export type N30a = MonadType<[5] | string[]>;
  export type N30b = MonadType<[5] | readonly []>;
  export type N30c = MonadType<[5] | readonly string[]>;
  export type N30d = MonadType<
    | []
    | [5, 10]
    | string []
    | readonly []
    | readonly [5, 10]
    | readonly string[]
  >;
  export type N31 = MonadType<ArrayN<string>>;
  export type N32 = MonadType<[string?]>;
  export type N33 = MonadType<readonly [string?]>;
}
