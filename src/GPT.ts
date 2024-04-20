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
    public runtime(): null | GPTOutput {
      try {
        const {
          _a,
          _u,
        }: GPTSetting = this
          .setting
          .unmerged;

        const _i: typeof GPT.prototype.input = this.input ?? "";
        const i: GPTInput = typeof _i === "string"
          ? { prompt: _i }
          : _i;
        const arg: Required<GPTInput> = {
          prompt: i.prompt,
          model: "model" in i
            ? i.model
            : _u.default.model,
          token:
              "token" in i
              && Number.isInteger(i.token)
              && i.token <= _a.limit.token
                ? i.token
                : _u.default.token,
          temperature:
            "temperature" in i
              && Number.isFinite(i.temperature)
              && i.temperature >= _a.limit.temperature.min
              && i.temperature <= _a.limit.temperature.max
              ? i.temperature
              : _u.default.temperature,
          p:
            "p" in i
              && Number.isFinite(i.p)
              && i.p >= _a.limit.p.min
              && i.p <= _a.limit.p.max
              ? i.p
              : _u.default.p,
          preset: "preset" in i && i.preset in _u.presets
            ? i.preset
            : _u.default.preset,
        };

        const preset: null | GPTPreset = _u
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
                  : !preset.user.includes(_a.presetTag)
                      ? arg.prompt
                      : preset.user.replace(_a.presetTag, arg.prompt),
              }
          : arg.prompt;

        return {
          api: [
            _a.api.host,
            _a.api.version,
            _a.api.action,
          ].join("/"),
          header: {
            auth: _u.id.token,
            org: _u.id.org,
          },
          body: {
            message: system === ""
              ? { user }
              : { system, user },
            temperature: arg.temperature,
            p: arg.p,
            model: _a.models[arg.model],
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
