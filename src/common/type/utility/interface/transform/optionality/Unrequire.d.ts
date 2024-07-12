declare type Unrequire<
  R,
  OK,
> = Keys<R> extends never
  ? never
  : literalful<OK> extends never
    ? never
    : {
      [K in Exclude<Keys<R>, OK>]: R[K]
    } & {
      [K in Extract<Keys<R>, OK>]?: R[K]
    };
