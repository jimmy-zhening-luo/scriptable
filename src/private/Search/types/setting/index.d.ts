import type { IEngine } from "./engine";

type Engine
= | Unflat<stringful>
  | IEngine<
    "url",
    "force",
    never,
    Unflat<stringful>
  >
  | IEngine<
    "shortcut",
    | "encode"
    | "notify"
  >;

export interface Setting {
  alias: Tableful<stringful>;
  chars: Tableful<Engine>;
  engines: Tableful<Engine>;
}
