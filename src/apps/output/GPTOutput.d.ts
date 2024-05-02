declare type GPTOutput = {
  api: string;
  header: {
    auth: string;
    org: string;
  };
  body: {
    message: {
      user: string;
      system?: string;
    };
    model: string;
    token: number;
    temperature: number;
    p: number;
  };
};
