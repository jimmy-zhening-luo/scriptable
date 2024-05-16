// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class GPT extends shortcut<
    GptInput,
    GptOutput,
    GptSetting
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
          defaults,
          presets,
        },
      } = this
        .setting
        .parsed;
      const arg:
        | GptInputFullyWrapped
        | GptInputPrompt = this.input ?? "";
      const ii: GptInputFullyWrapped = typeof arg !== "string" && "prompt" in arg
        ? arg
        : { prompt: arg };
      const i: Required<GptInputFullyWrapped> = {
        prompt: ii.prompt,
        model:
          "model" in ii
            ? ii.model
            : defaults.model,
        token:
          "token" in ii
          && Number.isInteger(ii.token)
          && ii.token >= limit.token.min
          && ii.token <= limit.token.max
            ? ii.token
            : defaults.token,
        temperature:
          "temperature" in ii
          && Number.isFinite(ii.temperature)
          && ii.temperature >= limit.temperature.min
          && ii.temperature <= limit.temperature.max
            ? ii.temperature
            : defaults.temperature,
        p:
          "p" in ii
          && Number.isFinite(ii.p)
          && ii.p >= limit.p.min
          && ii.p <= limit.p.max
            ? ii.p
            : defaults.p,
        preset:
          "preset" in ii
          && ii.preset in presets
            ? ii.preset
            : defaults.preset,
        location:
          "location" in ii
            ? ii.location
            : defaults.location,
      };
      const preset: Null<GptPromptFull> = typeof i.prompt === "string"
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
      const messages: GptMessages<boolean> = (
        typeof i.prompt === "string"
          ? preset === null || preset.system === ""
            ? [
                {
                  role: "user",
                  content: i.prompt,
                },
              ]
            : [
                {
                  role: "system",
                  content: preset.system,
                },
                {
                  role: "user",
                  content: preset.user.includes(tags.preset)
                    ? preset.user.replace(
                      tags.preset,
                      i.prompt,
                    )
                    : i.prompt,
                },
              ]
          : [
              {
                role: "system",
                content: i.prompt.system,
              },
              {
                role: "user",
                content: i.prompt.user,
              },
            ]
      )
        .map(
          (message: GptMessage<"system" | "user">): GptMessage<"system" | "user"> => {
            return {
              role: message.role,
              content: message.content
                .replace(
                  tags.location,
                  location,
                ),
            };
          },
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
          messages,
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
