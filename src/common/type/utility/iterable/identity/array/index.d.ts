declare type ArrayType<A> = [A] extends [readonly unknown[]] ? A : never;

// tests
declare namespace ArrayType {
  export type T0 = ArrayType<[]>;
  export type T1 = ArrayType<[1, 1]>;
  export type T2 = ArrayType<string[]>;
  export type T3 = ArrayType<readonly []>;
  export type T4 = ArrayType<readonly [1, 1]>;
  export type T5 = ArrayType<readonly string[]>;
  export type T6 = ArrayType<[[]]>;
  export type T7 = ArrayType<string[] | int[]>;
  export type T8 = ArrayType<(string | int)[]>;
  export type T9 = ArrayType<
    | []
    | [5, 10]
    | string []
    | readonly []
    | readonly [5, 10]
    | readonly string[]
  >;
  export type T10 = ArrayType<[1?, ...string[]]>;
  export type T11 = ArrayType<[1] | [1, 2?]>;
}

declare namespace NotArrayType {
  export type N0 = ArrayType<"">;
  export type N1 = ArrayType<"test">;
  export type N2 = ArrayType<string>;
  export type N3 = ArrayType<boolean>;
  export type N4 = ArrayType<true>;
  export type N5 = ArrayType<false>;
  export type N6 = ArrayType<0>;
  export type N7 = ArrayType<1>;
  export type N8 = ArrayType<number>;
  export type N9 = ArrayType<null>;
  export type N10 = ArrayType<undefined>;
  export type N11 = ArrayType<unknown>;
  export type N12 = ArrayType<never>;
  export type N13 = ArrayType<void>;
  export type N14 = ArrayType<()=> void>;
  export type N15 = ArrayType<(a: string)=> []>;
  export type N16 = ArrayType<Record<string, unknown>>;
  export type N17 = ArrayType<Record<number, 5>>;
  export type N18 = ArrayType<stringful>;
  export type N19 = ArrayType<{ 0: string }>;
  export type N20 = ArrayType<{
    0: string;
    length: 1;
  }>;
  export type N21 = ArrayType<symbol>;
  export type N22 = ArrayType<object>;
  export type N23 = ArrayType<
    | []
    | object
  >;
  export type N24 = ArrayType<
    | []
    | string
  >;
  export type N25 = ArrayType<
    | []
    | null
  >;
}
