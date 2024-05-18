declare type Constructor<C, This extends InstanceType<C> = InstanceType<C>> = new (...args: ConstructorParameter<C>) => This;
