declare type GptOutput = {
  api: string;
  header: Record<
    | "auth"
    | "org"
    ,
    string
  >;
  body:
    & {
      messages: GptMessages<boolean>;
      model: string;
    }
    & Record<
      | "token"
      | "temperature"
      | "p"
      ,
      number
    >
  ;
};
