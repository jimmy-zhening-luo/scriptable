declare type Truth<B extends boolean> = true extends LiteralPrimitive<B, boolean>
  ? LiteralPrimitive<B, boolean>
  : never;
