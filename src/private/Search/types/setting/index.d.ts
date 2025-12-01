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

interface IAlias extends AppEngine, WebEngine {
  alias: stringful;
}

type Engine
= | Unflat<stringful>
  | AppEngine
  | WebEngine;

export interface Setting {
  alias: Tableful<stringful | Alias>;
  chars: Tableful<Engine>;
  engines: Tableful<Engine>;
}
