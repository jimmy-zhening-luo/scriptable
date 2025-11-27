declare type Instance<
  Class extends abstract new (...args: any) => unknown,
> = InstanceType<Class>;
