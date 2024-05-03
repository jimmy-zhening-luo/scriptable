declare const filepath: unique symbol;
declare type FString<Root extends boolean> = Root extends true
  ? stringful & { [filepath]: "root" }
  : string & { [filepath]: "subpath" };
