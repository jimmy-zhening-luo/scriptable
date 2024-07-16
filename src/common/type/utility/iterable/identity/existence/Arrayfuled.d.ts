declare type Arrayfuled<A extends readonly unknown[]> = 0 extends ArrayLength<A>
  ? never
  : A;

declare namespace Arrayfuled {
  export type T0 = Arrayfuled<[1, 1]>;
  export type T1 = Arrayfuled<readonly [1, 1]>;
  export type T2 = Arrayfuled<readonly [1, 1?]>;
  export type T3 = Arrayfuled<readonly [1?, 1?]>;
  export type T4 = Arrayfuled<readonly [1?, 1?]>;
  export type T5 = Arrayfuled<[[]]>;
  export type T6 = Arrayfuled<string[] | int[]>;
  export type T7 = Arrayfuled<(string | int)[]>;
  export type T18 = Arrayfuled<[string] | [5, 10]>;
  export type T8a = Arrayfuled<Tuple<boolean>>;
  export type T8b = Arrayfuled<ArrayN<string, 3>>;
  export type T8c = Arrayfuled<
    | ArrayN<string, 3>
    | Tuple<boolean>
    | [string]
    | [5, 10]
    | [5, 13]
    | readonly [5, 10]
  >;
}

declare namespace NotArrayfuled {
  export type N12 = Arrayfuled<never>;
  export type N26 = Arrayfuled<[]>;
  export type N27 = Arrayfuled<string[]>;
  export type N28 = Arrayfuled<readonly []>;
  export type N29 = Arrayfuled<readonly string[]>;
  export type N30 = Arrayfuled<[5] | []>;
  export type N30a = Arrayfuled<[5] | string[]>;
  export type N30b = Arrayfuled<[5] | readonly []>;
  export type N30c = Arrayfuled<[5] | readonly string[]>;
  export type N30d = Arrayfuled<
    | []
    | [5, 10]
    | string []
    | readonly []
    | readonly [5, 10]
    | readonly string[]
  >;
  export type N31 = Arrayfuled<ArrayN<string, 0>>;
  export type N32 = Arrayfuled<[string?]>;
  export type N33 = Arrayfuled<readonly [string?]>;
}
