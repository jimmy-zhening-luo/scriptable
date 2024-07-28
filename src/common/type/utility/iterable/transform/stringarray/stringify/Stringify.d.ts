declare type Stringify<C> = C extends abstract new (...args: infer A)=> infer O
  ? O extends { string: infer S extends string }
    ? S
    : O extends { toString: ()=> infer S extends string }
      ? S
      : never
  : C extends { string: infer S extends string }
    ? S
    : C extends { toString: ()=> infer S extends string }
      ? S
      : never;
