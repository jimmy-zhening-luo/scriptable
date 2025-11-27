declare type Instance<T> = T extends abstract new (...args: infer Arguments) => infer Instance
  ? Instance
  : never;
