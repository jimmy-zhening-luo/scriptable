declare type PathN<C, N extends number = 0> = Stringify<C> extends never
  ? never
  : ArrayN<Stringify<C>, N>;
