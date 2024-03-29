// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class GPT extends shortcut<
    string | GPTInput,
    GPTOutput,
    GPTSetting
  > {
    public runtime(): GPTOutput {
      try {
        // Get Shortcut input
        const input: string | GPTInput = this.input ?? "";

        // Validate input is a Dictionary
        if (typeof input === "string")
          throw new TypeError(
            `Shortcut input must be dictionary. Instead it was undefined or string: ${String(input)}`,
          );
        else {
          // Get settings
          const {
            app,
            user,
          }: GPTSetting = this
            .setting
            .unmerged;

          // Fill in blank options with defaults
          const final: GPTFinal = {
            prompt: input.prompt,
            model: "model" in input
              ? input.model
              : user.default.model,
            token:
              "token" in input
              && Number.isInteger(input.token)
              && input.token <= app.limit.token
                ? input.token
                : user.default.token,
            temperature:
            "temperature" in input
              && Number.isFinite(input.temperature)
              && input.temperature >= app.limit.temperature.min
              && input.temperature <= app.limit.temperature.max
              ? input.temperature
              : user.default.temperature,
            preset: "preset" in input && input.preset in user.presets
              ? input.preset
              : user.default.preset,
          };

          // Build user message
          const preset: undefined | PresetPrompt = user
            .presets[
              final.preset
            ] as undefined | PresetPrompt;

          const message: GPTOutput["body"]["message"] = preset === undefined
            ? {
                user: final.prompt,
              }
            : preset.system === ""
              ? {
                  user: !("user" in preset) || !preset.user.includes(app.presetTag)
                    ? final.prompt
                    : preset.user.replace(app.presetTag, final.prompt),
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
            api: [
              app.api.host,
              app.api.version,
              app.api.action,
            ].join("/"),
            header: {
              auth: user.id.token,
              org: user.id.org,
            },
            body: {
              message: message as { user: string; system?: string },
              model: app.models[final.model],
              token: final.token,
              temperature: final.temperature,
            },
          };
        }
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
