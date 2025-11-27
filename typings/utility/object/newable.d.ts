declare type Newable<Function> = Function extends
abstract new (...args: infer Arguments) => infer Instance
  ? new (...args: Arguments) => Instance
  : never;
