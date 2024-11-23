declare type literal<S extends string> = string extends Exclude<S, object>
  ? never
  : Exclude<S, object>;
