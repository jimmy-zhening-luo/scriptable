declare type Constructor<Ctor> = [Ctor] extends [
  abstract new (...arguments: infer Arguments) => infer Instance
]
  ? new (...arguments: Arguments) => Instance
  : never;
