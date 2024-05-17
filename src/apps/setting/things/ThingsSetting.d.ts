declare type ThingsSetting = {
  app: {
    tag: string;
    delims: Record<"item" | "line", string>;
  };
  user: {
    triage: string;
    lists: Record<string, string>;
  };
};
