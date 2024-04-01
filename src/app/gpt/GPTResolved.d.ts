declare type GPTResolved = {
  prompt: string; // Text or Base64 encoded text
} & GPTSetting["user"]["default"];
