declare type Constructor<C> = C extends abstract new (...args: infer A)=> infer O
  ? new (...args: A)=> O
  : never;
