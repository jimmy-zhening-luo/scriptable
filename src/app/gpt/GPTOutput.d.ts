declare interface GPTOutput {
  message: {
    user: string;
    system?: string;
  };
  model: string;
  token: number;
  temperature: number;
}
