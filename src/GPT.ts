// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class GPT extends shortcut<
    | GPTInput
    | { system: string; user: string }
    | string,
    GPTOutput,
    GPTSetting
  > {
    public runtime(): Nullable<GPTOutput> {
      const s: GPTSetting = this
        .setting
        .unmerged;
      const __i: typeof GPT.prototype.input = this.input ?? "";
      const _i: GPTInput = typeof __i === "string"
        ? { prompt: __i }
        : !("prompt" in __i)
            ? { prompt: __i }
            : __i;
      const i: Required<GPTInput> = {
        prompt: _i.prompt,
        model: "model" in _i
          ? _i.model
          : s.user.default.model,
        token:
            "token" in _i
            && Number.isInteger(_i.token)
            && _i.token <= s.app.limit.token
              ? _i.token
              : s.user.default.token,
        temperature:
          "temperature" in _i
          && Number.isFinite(_i.temperature)
          && _i.temperature >= s.app.limit.temperature.min
          && _i.temperature <= s.app.limit.temperature.max
            ? _i.temperature
            : s.user.default.temperature,
        p:
          "p" in _i
          && Number.isFinite(_i.p)
          && _i.p >= s.app.limit.p.min
          && _i.p <= s.app.limit.p.max
            ? _i.p
            : s.user.default.p,
        preset: "preset" in _i && _i.preset in s.user.presets
          ? _i.preset
          : s.user.default.preset,
      };
      const preset: Nullable<Required<GPTPreset>> = typeof i.prompt === "string"
        ? {
            system: s.user.presets[i.preset]?.system ?? "",
            user: s.user.presets[i.preset]?.user ?? "",
          }
        : null;
      const message: GPTOutput["body"]["message"] = typeof i.prompt === "string"
        ? !preset || preset.system === ""
            ? { user: i.prompt }
            : {
                system: preset.system,
                user: preset.user.includes(s.app.presetTag)
                  ? preset.user.replace(
                    s.app.presetTag,
                    i.prompt,
                  )
                  : i.prompt,
              }
        : i.prompt;

      return {
        api: [
          s.app.api.host,
          s.app.api.version,
          s.app.api.action,
        ].join("/"),
        header: {
          auth: s.user.id.token,
          org: s.user.id.org,
        },
        body: {
          message,
          temperature: i.temperature,
          p: i.p,
          model: s.app.models[i.model],
          token: i.token,
        },
      };
    }
  }
}

new GPT.GPT()
  .run();
