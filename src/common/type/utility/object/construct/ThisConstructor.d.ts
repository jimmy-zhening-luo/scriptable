declare type ThisConstructor<C, T> = C extends abstract new (...args: infer A)=> unknown
  ? new (...args: A)=> T
  : never;
