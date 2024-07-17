declare type literal<S extends string> = Primeval<S, string>;

declare namespace literal {
  export type T = literal<"">;
  export type T0 = literal<"a">;
  export type T1 = literal<"a" | "b">;
  export type T1b = literal<"a" | "">;
}

declare namespace Notliteral {
  export type N = literal<never>;
  export type N0 = literal<string>;

  // export type N1 = literal<unknown>;
  // export type N2 = literal<null>;
  // export type N3 = literal<undefined>;
  // export type N4 = literal<void>;
  // export type N5 = literal<object>;
  // export type N6 = literal<()=> "a">;
  // export type N7 = literal<symbol>;
  // export type N8 = literal<"a" | 5>;
}
