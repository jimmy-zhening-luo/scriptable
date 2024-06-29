declare type StringChain<
  Nodes,
  Separator extends string = "/",
  Reverse extends boolean = false,
> = literalful<
  Nodes
> extends never
  ? Nodes extends [
    infer Head,
    ...infer Tail,
  ]
    ? literalful<
      Head
    > extends never
      ? never
      : Tail extends []
        ? Head
        : Reverse extends true
          ? `${
              StringChain<
                Tail
                ,
                Separator
                ,
                true
              >
            }${
              Separator
            }${
              Head
            }`
          : `${
              Head
            }${
              Separator
            }${
              StringChain<
                Tail
                ,
                Separator
              >
            }`
    : never
  : Nodes;
