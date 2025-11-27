declare type Instance<
  Class extends abstract new (...arguments: unknown[]) => unknown,
> = InstanceType<Class>;
