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
          app,
          user,
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
            : user.default.model,
          token:
              "token" in i
              && Number.isInteger(i.token)
              && i.token <= app.limit.token
                ? i.token
                : user.default.token,
          temperature:
            "temperature" in i
              && Number.isFinite(i.temperature)
              && i.temperature >= app.limit.temperature.min
              && i.temperature <= app.limit.temperature.max
              ? i.temperature
              : user.default.temperature,
          p:
            "p" in i
              && Number.isFinite(i.p)
              && i.p >= app.limit.p.min
              && i.p <= app.limit.p.max
              ? i.p
              : user.default.p,
          preset: "preset" in i && i.preset in user.presets
            ? i.preset
            : user.default.preset,
        };

        const preset: null | GPTPreset = user
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
                  : !preset.user.includes(app.presetTag)
                      ? arg.prompt
                      : preset.user.replace(app.presetTag, arg.prompt),
              }
          : arg.prompt;

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
            message: system === ""
              ? { user }
              : { system, user },
            temperature: arg.temperature,
            p: arg.p,
            model: app.models[arg.model],
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
