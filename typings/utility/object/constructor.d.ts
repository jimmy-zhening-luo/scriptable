declare type Constructor<Function> = [Function] extends [
  abstract new (...arguments: infer Arguments) => infer Instance
]
  ? new (...arguments: Arguments) => Instance
  : never;
