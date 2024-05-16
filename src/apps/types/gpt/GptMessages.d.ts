declare type GptMessages<S extends boolean = false> = S extends false
  ? [GptMessage<"user">]
  : [GptMessage<"system">, GptMessage<"user">];

declare type GptMessage<R extends
| "system"
| "user",
> = {
  role: R;
  content: string;
};
