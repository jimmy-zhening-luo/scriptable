declare type GptMessages<
  S extends boolean = false,
> = S extends S
  ? S extends false
    ? [
        GptMessage<"user">,
      ]
    : [
        GptMessage<"system">,
        GptMessage<"user">,
      ]
  : never;

declare type GptMessage<
  R extends
  | "system"
  | "user"
  ,
> = {
  role: R;
  content: string;
};
