export interface Prompt {
  prompt: Field<
    "id",
    "answer"
  >;
}

export interface Setting extends Prompt {
  api: string;
  auth: Field<
    | "token"
    | "org"
  >;
}

export interface Input extends Partial<Prompt> {
  input: string;
  variables?: FieldTable;
  metadata?: FieldTable;
}
