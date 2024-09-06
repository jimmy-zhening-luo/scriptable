declare type Stringify<C> = C extends abstract new (...args: infer A) => infer O
  ? O extends { string: infer S extends string }
    ? S
    : O extends { toString: () => infer S extends string }
      ? S
      : never
  : C extends ((...args: infer A) => infer S extends string)
    ? S
    : C extends { string: infer S extends string }
      ? S
      : C extends { toString: () => infer S extends string }
        ? S
        : never;

declare namespace Stringify {
  export type T = Stringify<CharString<"OK-Instance">>;
  export type T0 = Stringify<CharStringCtor>;
  export type T1 = Stringify<charstringfunc<"OK-Function">>;

  type CharStringCtor = abstract new () => CharString<"OK-Constructor">;

  interface CharString<Validator extends string> {
    readonly string: valid<stringful, [Validator, "string"]>;
  }

  type charstringfunc<Validator extends string> = () => valid<stringful, [Validator, "string"]>;
}
