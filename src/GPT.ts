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
    null | GPTOutput,
    GPTSetting
  > {
    public runtime(): null | GPTOutput {
      try {
        const raw: typeof GPT.prototype.input = this.input ?? "";
        const i: GPTInput = typeof raw === "string"
          ? { prompt: raw }
          : raw;

        const {
          app,
          user,
        }: GPTSetting = this
          .setting
          .unmerged;

        const resolved: GPTResolved = {
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
          preset: "preset" in i && i.preset in user.presets
            ? i.preset
            : user.default.preset,
        };

        // Build user message
        const preset: null | GPTPreset = user
          .presets[
            resolved.preset
          ] ?? null;

        const message: GPTOutput["body"]["message"] = !preset
          ? {
              user: resolved.prompt,
            }
          : preset.system === ""
            ? {
                user: !("user" in preset) || !preset.user.includes(app.presetTag)
                  ? resolved.prompt
                  : preset.user.replace(app.presetTag, resolved.prompt),
              }
            : {
                system: preset.system,
                user: !("user" in preset)
                  ? resolved.prompt
                  : !preset.user.includes(app.presetTag)
                      ? resolved.prompt
                      : preset.user.replace(app.presetTag, resolved.prompt),
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
            model: app.models[resolved.model],
            token: resolved.token,
            temperature: resolved.temperature,
          },
        };
      }

      catch (e) {
        throw new EvalError(
          `GPT: runtime: \n${e as string}`,
        );
      }
    }
  }
}

new GPT.GPT()
  .run();
