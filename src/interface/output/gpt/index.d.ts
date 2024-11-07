declare interface GptOutput {
  api: string;
  header: Field<"auth" | "org">;
  body: {
    model: string;
    messages: readonly GptMessage[];
  } & Field<keyof GptSetting["defaults"]["sliders"]>;
}
