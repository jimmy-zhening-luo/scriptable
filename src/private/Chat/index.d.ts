export interface IPrompt {
  prompt: Field<
    "id",
    "answer"
  >;
}

export interface Setting extends IPrompt {
  api: string;
  auth: Field<
    | "token"
    | "org"
  >;
  options: Table;
}

export interface Input extends Partial<IPrompt> {
  input: string;
  variables?: FieldTable;
}

export interface Response {
  text: {
    format: Flag<"schema">;
  };
  output: [
    {
      content?: [Field<"text">];
      input?: string;
    }
  ];
}
