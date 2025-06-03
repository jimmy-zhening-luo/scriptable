declare type Literalful<S extends string> = "" extends Literal<S>
  ? never
  : Literal<S>;
