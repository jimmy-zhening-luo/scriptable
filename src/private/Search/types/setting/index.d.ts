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

type Engine = AppEngine | WebEngine;

interface Alias {
  alias: stringful;
  prepend: stringful;
}

export interface Setting {
  alias: Tableful<Alias | stringful>;
  chars: Tableful<Engine | stringful>;
  engines: Tableful<Engine | stringful>;
}
