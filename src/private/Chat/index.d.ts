export interface Prompt {
  prompt: Field<
    "id",
    "answer"
  >;
}

export interface Setting extends Prompt {
  auth: Field<
    | "token"
    | "org"
  >;
}

export interface Input extends Partial<Prompt> {
  variables?: FieldTable;
  metadata?: FieldTable;
}
