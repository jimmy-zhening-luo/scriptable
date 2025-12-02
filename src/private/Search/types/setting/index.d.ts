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
  alias: stringful;
  prepend?: stringful;
}

type Alias
= | stringful
  | AliasOverride;

type Engine
= | stringful
  | AppEngine
  | WebEngine;

type StringOption<T extends object>

export interface Setting {
  alias: Tableful<
    | stringful
    | Alias
  >;
  chars: Tableful<Engine>;
  engines: Tableful<Engine>;
}
