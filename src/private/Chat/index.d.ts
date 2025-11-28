export interface Dictionary {
  variables?: FieldTable;
  metadata?: FieldTable;
}

export interface ChatInput extends Dictionary {
  prompt?: Field<
    "id",
    "answer"
  >;
}

export interface ChatSetting extends Required<ChatInput> {
  auth: Field<
    | "token"
    | "org"
  >;
}
