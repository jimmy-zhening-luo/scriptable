// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class GPT extends shortcut<
    GPTInput,
    GPTOutput,
    GPTSetting
  > {
    public runtime(): ReturnType<GPT["run"]> {
      const {
        app: {
          tags,
          plugins,
          api,
          models,
          limit,
        },
        user: {
          id,
          default,
          presets,
        },
      } = this
        .setting
        .parsed;
      const arg: GPTInput = this.input ?? "";
      const ii: GPTPromptOptions = typeof arg !== "string" && "prompt" in arg
        ? arg
        : { prompt: arg };
      const i: Required<GPTPromptOptions> = {
        prompt: ii.prompt,
        model:
          "model" in ii
            ? ii.model
            : default.model,
        token:
          "token" in ii
          && Number.isInteger(ii.token)
          && ii.token <= limit.token
            ? ii.token
            : default.token,
        temperature:
          "temperature" in ii
          && Number.isFinite(ii.temperature)
          && ii.temperature >= limit.temperature.min
          && ii.temperature <= limit.temperature.max
            ? ii.temperature
            : default.temperature,
        p:
          "p" in ii
          && Number.isFinite(ii.p)
          && ii.p >= limit.p.min
          && ii.p <= limit.p.max
            ? ii.p
            : default.p,
        preset:
          "preset" in ii
          && ii.preset in presets
            ? ii.preset
            : default.preset,
        location:
          "location" in ii
            ? ii.location
            : default.location,
      };
      const preset: Nullable<Required<GPTPreset>> = typeof i.prompt === "string"
        ? {
            system: presets[i.preset]?.system ?? "",
            user: presets[i.preset]?.user ?? "",
          }
        : null;
      const location: string = [
        plugins.location,
        i.location,
      ]
        .join("");
      const message: GPTOutput["body"]["message"] = typeof i.prompt === "string"
        ? preset === null || preset.system === ""
          ? { user: i.prompt }
          : {
              system: preset.system,
              user: preset.user.includes(tags.preset)
                ? preset.user.replace(
                  tags.preset,
                  i.prompt,
                )
                : i.prompt,
            }
        : i.prompt;

      message.user = message.user.replace(
        tags.location,
        location,
      );

      if ("system" in message)
        message.system = message.system.replace(
          tags.location,
          location,
        );

      return {
        api: [
          api.host,
          api.version,
          api.action,
        ].join("/"),
        header: {
          auth: id.token,
          org: id.org,
        },
        body: {
          message,
          temperature: i.temperature,
          p: i.p,
          model: models[i.model],
          token: i.token,
        },
      };
    }
  }
}

new GPT.GPT()
  .run();
