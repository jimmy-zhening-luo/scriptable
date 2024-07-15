declare type Arrayed<A> = [A] extends [readonly unknown[]] ? A : never;

// tests
declare namespace Arrayed {
  export type T0 = Arrayed<[]>;
  export type T1 = Arrayed<[1, 1]>;
  export type T2 = Arrayed<string[]>;
  export type T3 = Arrayed<readonly []>;
  export type T4 = Arrayed<readonly [1, 1]>;
  export type T5 = Arrayed<readonly string[]>;
  export type T6 = Arrayed<[[]]>;
  export type T7 = Arrayed<string[] | int[]>;
  export type T8 = Arrayed<(string | int)[]>;
  export type T9 = Arrayed<
    | []
    | [5, 10]
    | string []
    | readonly []
    | readonly [5, 10]
    | readonly string[]
  >;
  export type T10 = Arrayed<[1?, ...string[]]>;
  export type T11 = Arrayed<[1] | [1, 2?]>;
}

declare namespace NotArrayed {
  export type N0 = Arrayed<"">;
  export type N1 = Arrayed<"test">;
  export type N2 = Arrayed<string>;
  export type N3 = Arrayed<boolean>;
  export type N4 = Arrayed<true>;
  export type N5 = Arrayed<false>;
  export type N6 = Arrayed<0>;
  export type N7 = Arrayed<1>;
  export type N8 = Arrayed<number>;
  export type N9 = Arrayed<null>;
  export type N10 = Arrayed<undefined>;
  export type N11 = Arrayed<unknown>;
  export type N12 = Arrayed<never>;
  export type N13 = Arrayed<void>;
  export type N14 = Arrayed<()=> void>;
  export type N15 = Arrayed<(a: string)=> []>;
  export type N16 = Arrayed<Record<string, unknown>>;
  export type N17 = Arrayed<Record<number, 5>>;
  export type N18 = Arrayed<stringful>;
  export type N19 = Arrayed<{ 0: string }>;
  export type N20 = Arrayed<{
    0: string;
    length: 1;
  }>;
  export type N21 = Arrayed<symbol>;
  export type N22 = Arrayed<Bookmark>;
  export type N23 = Arrayed<
    | []
    | {}
  >;
  export type N24 = Arrayed<
    | []
    | string
  >;
  export type N25 = Arrayed<
    | []
    | null
  >;
}
