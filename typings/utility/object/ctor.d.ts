declare type Constructor<Ctor> = [Ctor] extends [never]
  ? never
  : [Ctor] extends [abstract new (...args: infer Args) => infer Instance]
      ? new (...args: Args) => Instance
      : never;
