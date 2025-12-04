import type {
  Message,
  CustomToolCall,
  FunctionCall,
} from "./payload";

export interface Response {
  text: {
    format: Flag<"schema">;
  };
  output: [
    | Message
    | CustomToolCall
    | FunctionCall,
  ];
}
