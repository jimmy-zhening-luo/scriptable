declare const reserved: unique symbol;
export type reserved = stringful & { [reserved]: "shortcut" };

import type { IEngine } from "./engine";

interface AppEngine extends IEngine<"shortcut"> {
  encode?: boolean;
  notify?: boolean;
}

interface WebEngine extends IEngine<
  "url",
  Unflat<stringful>
> {
  force?: boolean;
}

interface Alias {
  key: stringful;
  prepend: stringful;
}

export interface Setting {
  alias: {
    [key: stringful]:
      | Alias
      | stringful;
  };
  engines: {
    [key: stringful]:
      | AppEngine
      | WebEngine
      | stringful;
    [key: reserved]: AppEngine;
  };
}
