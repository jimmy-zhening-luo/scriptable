declare type literalful<S extends string> = "" extends literal<S>
  ? never
  : literal<S>;
