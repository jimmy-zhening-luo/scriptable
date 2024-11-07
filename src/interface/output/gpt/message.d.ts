declare interface GptMessage {
  role:
    | "system"
    | "user"
    | "assistant"
  ;
  content: string;
}
