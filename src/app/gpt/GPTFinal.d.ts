declare type GPTFinal = {
  prompt: string; // Text or Base64 encoded text
} & GPTSettings["user"]["defaults"];
