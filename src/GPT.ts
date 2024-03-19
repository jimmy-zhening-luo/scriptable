// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: play;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  interface ShortcutParams {
    prompt: string;
    model?: GPTSettings["user"]["defaults"]["model"];
    token?: number;
    temperature?: number;
    preset?: string;
  }

  export class GPT extends shortcut {
    public runtime(): null | GPTResponse {
      try {
        // Get config from Files
        const config: GPTSettings = this
          .config
          .unmerged as GPTSettings;

        // Get input from Shortcut
        const prompt: string = this
          .input
          .plainTexts[0] ?? "";

        let params: ShortcutParams = {
          prompt,
        };

        // Parse Shortcut input
        if (prompt.startsWith("{")) {
          try {
            params = JSON.parse(prompt) as ShortcutParams;

            if (params.prompt.endsWith("=") && !params.prompt.includes(" "))
              params.prompt = atob(params.prompt);
          }
          catch (e) {
            throw new SyntaxError(`GPT: runtime: Invalid Shortcut input JSON: \n${e as string}`);
          }
        }

        // TBD: Implement preset logic -> system / user messages
        return {
          message: {
            user: (
              config
                .user
                .presets[
                  params.preset ?? config.user.defaults.preset
                ]
                ?.system ?? ""
            ) + params.prompt,
          },
          options: {
            model: config
              .app
              .models[
                params.model ?? config.user.defaults.model
              ],
            token: params.token ?? config.user.defaults.token,
            temperature: params.temperature ?? config.user.defaults.temperature,
          },
        };
      }
      catch (e) {
        throw new EvalError(`GPT: runtime: Error running app: \n${e as string}`);
      }
    }
  }

  interface GPTResponse {
    message: {
      user: string;
      system?: string;
    };
    options: {
      model: string;
      token: number;
      temperature: number;
    };
  }
}

new GPT.GPT()
  .run();
Script.complete();
