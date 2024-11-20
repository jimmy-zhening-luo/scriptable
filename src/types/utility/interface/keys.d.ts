declare type Keys<R extends object> = Interface<R> extends never
  ? never
  : keyof Interface<R>;
