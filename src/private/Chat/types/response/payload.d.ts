interface IToolCall<Tool extends string> {
  type: `${Tool}_call`;
  name: string;
}

export interface CustomToolCall extends IToolCall<"custom_tool"> {
  input: string;
}

export interface FunctionCall extends IToolCall<"function"> {
  name: string;
  arguments: Table;
}

export interface Message {
  content: [Field<"text">];
}
