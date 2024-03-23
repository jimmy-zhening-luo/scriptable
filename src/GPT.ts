// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: play;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class GPT extends shortcut {
    public runtime(): GPTOutput {
      try {
        // Get settings
        const {
          app,
          user,
        }: GPTSettings = this
          .setting
          .unmerged as GPTSettings;

        // Get Shortcut raw input (string)
        const rawInput: string = this
          .input
          .plainTexts[0] ?? "";

        // Parse input (string) into GPTInput
        const input: GPTInput = !rawInput.startsWith("{")
          ? {
              prompt: rawInput,
            }
          : JSON.parse(rawInput) as GPTInput;

        if (input.prompt.endsWith("=") && !input.prompt.includes(" "))
          input.prompt = atob(input.prompt);

        // Fill in blank options with defaults
        const final: GPTFinal = {
          prompt: input.prompt,
          model: input.model ?? user.default.model,
          token:
            input.token !== undefined
            && Number.isInteger(input.token)
            && input.token <= app.limit.token
              ? input.token
              : user.default.token,
          temperature:
            input.temperature !== undefined
            && Number.isFinite(input.temperature)
            && input.temperature >= app.limit.temperature.min
            && input.temperature <= app.limit.temperature.max
              ? input.temperature
              : user.default.temperature,
          preset: input.preset !== undefined && input.preset in user.presets
            ? input.preset
            : user.default.preset,
        };

        // Build user message
        const preset: undefined | PresetPrompt = user.presets[final.preset];

        const message: GPTOutput["message"] = !preset
          ? {
              user: final.prompt,
            }
          : {
              system: preset.system,
              user: preset.user === undefined
                ? final.prompt
                : !preset.user.includes(app.presetTag)
                    ? final.prompt
                    : preset.user.replace(app.presetTag, final.prompt),
            };

        // Build GPTResponse from ChatOptions & return GPTResponse to Shortcut
        return {
          message,
          model: app.models[final.model],
          token: final.token,
          temperature: final.temperature,
        };
      }
      catch (e) {
        throw new EvalError(`GPT: runtime: Error running app: \n${e as string}`);
      }
    }
  }
}

new GPT.GPT()
  .run();
Script.complete();
