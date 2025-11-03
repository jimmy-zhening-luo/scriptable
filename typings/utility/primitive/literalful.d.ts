declare type Literalful<
  String extends string,
  Exclusion extends string = never,
> = "" extends Literal<String>
  ? never
  : [Exclusion] extends [never]
    ? Literal<String>
    : Literal<Exclusion> extends never
      ? never
      : Literal<String> extends `${string}${Literal<Exclusion>}${string}` 
        ? never
        : Literal<String>;
