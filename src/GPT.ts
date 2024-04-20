// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class GPT extends shortcut<
    GPTInput
      | { system: string, user: string }
      | string,
    GPTOutput,
    GPTSetting
  > {
    public runtime(): null | GPTOutput {
      try {
        const s: GPTSetting = this
          .setting
          .unmerged;

        const _i: typeof GPT.prototype.input = this.input ?? "";
        const i: GPTInput = typeof _i === "string"
          ? { prompt: _i }
          : !("prompt" in _i)
            ? { prompt: _i }
            : _i;
        const arg: Required<GPTInput> = {
          prompt: i.prompt,
          model: "model" in i
            ? i.model
            : s.user.default.model,
          token:
              "token" in i
              && Number.isInteger(i.token)
              && i.token <= s.app.limit.token
                ? i.token
                : s.user.default.token,
          temperature:
            "temperature" in i
              && Number.isFinite(i.temperature)
              && i.temperature >= s.app.limit.temperature.min
              && i.temperature <= s.app.limit.temperature.max
              ? i.temperature
              : s.user.default.temperature,
          p:
            "p" in i
              && Number.isFinite(i.p)
              && i.p >= s.app.limit.p.min
              && i.p <= s.app.limit.p.max
              ? i.p
              : s.user.default.p,
          preset: "preset" in i && i.preset in s.user.presets
            ? i.preset
            : s.user.default.preset,
        };

        const preset: null | GPTPreset = s.user
          .presets[
            arg.preset
          ] ?? null;
        const {
          system,
          user,
        }: {
          system: string,
          user: string,
        } = typeof arg.prompt === "string"
          ? !preset
            ? {
                system: "",
                user: arg.prompt,
              }
            : {
                system: preset.system,
                user: !("user" in preset)
                  ? arg.prompt
                  : !preset.user.includes(s.app.presetTag)
                      ? arg.prompt
                      : preset.user.replace(s.app.presetTag, arg.prompt),
              }
          : arg.prompt;

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
            message: system === ""
              ? { user }
              : { system, user },
            temperature: arg.temperature,
            p: arg.p,
            model: s.app.models[arg.model],
            token: arg.token,
          },
        };
      }

      catch (e) {
        throw new EvalError(
          `GPT: runtime`,
          { cause: e },
        );
      }
    }
  }
}

new GPT.GPT()
  .run();
