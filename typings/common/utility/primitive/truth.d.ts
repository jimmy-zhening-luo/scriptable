declare type Truth<B extends boolean> = true extends Primitive<B, boolean>
  ? Primitive<B, boolean>
  : never;
