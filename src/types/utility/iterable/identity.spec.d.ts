declare namespace ArrayType {
  export type T0 = IsArray<[]>;
  export type T1 = IsArray<[1, 1]>;
  export type T2 = IsArray<string[]>;
  export type T3 = IsArray<readonly []>;
  export type T4 = IsArray<readonly [1, 1]>;
  export type T5 = IsArray<readonly string[]>;
  export type T6 = IsArray<[[]]>;
  export type T7 = IsArray<string[] | int[]>;
  export type T8 = IsArray<(string | int)[]>;
  export type T9 = IsArray<
    | []
    | [5, 10]
    | string []
    | readonly []
    | readonly [5, 10]
    | readonly string[]
  >;
  export type T10 = IsArray<[1?, ...string[]]>;
  export type T11 = IsArray<[1] | [1, 2?]>;
  export type N0 = IsArray<"">;
  export type N1 = IsArray<"test">;
  export type N2 = IsArray<string>;
  export type N3 = IsArray<boolean>;
  export type N4 = IsArray<true>;
  export type N5 = IsArray<false>;
  export type N6 = IsArray<0>;
  export type N7 = IsArray<1>;
  export type N8 = IsArray<number>;
  export type N9 = IsArray<null>;
  export type N10 = IsArray<undefined>;
  export type N11 = IsArray<unknown>;
  export type N12 = IsArray<never>;
  export type N13 = IsArray<void>;
  export type N14 = IsArray<() => void>;
  export type N15 = IsArray<(a: string) => []>;
  export type N16 = IsArray<Record<string, unknown>>;
  export type N17 = IsArray<Record<number, 5>>;
  export type N18 = IsArray<stringful>;
  export type N19 = IsArray<{ 0: string }>;
  export type N20 = IsArray<{
    0: string;
    length: 1;
  }>;
  export type N21 = IsArray<symbol>;
  export type N22 = IsArray<object>;
  export type N23 = IsArray<
    | []
    | object
  >;
  export type N24 = IsArray<
    | []
    | string
  >;
  export type N25 = IsArray<
    | []
    | null
  >;
}
