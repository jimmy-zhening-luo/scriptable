declare type GptOutput = {
  api: string;
  header: {
    auth: string;
    org: string;
  };
  body: {
    messages: GptMessages<boolean>;
    model: string;
    token: number;
    temperature: number;
    p: number;
  };
};
