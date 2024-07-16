declare type literalful<S extends string> = "" extends literal<S>
  ? never
  : literal<S>;

declare namespace literalful {
  export type T0 = literalful<"a">;
}

declare namespace Notliteralful {

  export type N0 = literalful<never>;
  export type N1 = literalful<"">;
  export type N2 = literalful<string>;
  export type N2b = literalful<stringful>;
  export type N3 = literalful<"" | "a">;

  // export type N4 = literalful<"a" | string>;
  // export type N5 = literalful<[]>;
  // export type N5a = literalful<unknown>;
  // export type N5b = literalful<null>;
  // export type N5c = literalful<undefined>;
  // export type N5d = literalful<void>;
  // export type N5e = literalful<{}>;
  // export type N5f = literalful<()=> "a">;
  // export type N5g = literalful<symbol>;
  // export type N5h = literalful<"a" | 5>;
}
