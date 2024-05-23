// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class GPT extends shortcut<
    GptInput,
    GptOutput,
    GptSetting
  > {
    public runtime() {
      const {
        app: {
          tags,
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
      const raw =
        this
          .input ?? "";
      const ii =
        typeof raw !== "string"
        && "prompt" in raw
          ? raw
          : { prompt: raw };
      const i = {
        prompt:
          ii
            .prompt,
        model:
          "model" in ii
            ? ii
              .model
            : defaults
              .model,
        token:
          "token" in ii
          && Number.isInteger(ii.token)
          && ii.token >= limit.token.min
          && ii.token <= limit.token.max
            ? ii
              .token
            : defaults
              .token,
        temperature:
          "temperature" in ii
          && Number.isFinite(ii.temperature)
          && ii.temperature >= limit.temperature.min
          && ii.temperature <= limit.temperature.max
            ? ii
              .temperature
            : defaults
              .temperature,
        p:
          "p" in ii
          && Number.isFinite(ii.p)
          && ii.p >= limit.p.min
          && ii.p <= limit.p.max
            ? ii
              .p
            : defaults
              .p,
        preset:
          "preset" in ii
          && ii.preset in presets
            ? ii
              .preset
            : defaults
              .preset,
        location:
          "location" in ii
            ? ii
              .location
            : defaults
              .location,
      };
      const location =
        i
          .location;
      const preset =
        typeof i.prompt === "string"
          ? {
              system: (
                presets[
                  i.preset
                ]
                  ?.system ?? ""
              )
                .replace(
                  tags
                    .location,
                  location,
                ),
              user: (
                presets[
                  i.preset
                ]
                  ?.user ?? ""
              )
                .replace(
                  tags
                    .location,
                  location,
                ),
            }
          : null;
      const messageBox: {
        user: GptMessage<"user">;
        system?: GptMessage<"system">;
      } =
        typeof i.prompt === "string"
          ? preset === null
          || preset.system === ""
            ? {
                user: {
                  role: "user",
                  content: i
                    .prompt,
                },
              }
            : {
                system: {
                  role: "system",
                  content: preset
                    .system,
                },
                user: {
                  role: "user",
                  content: preset
                    .user
                    .includes(
                      tags
                        .preset,
                    )
                    ? preset
                      .user
                      .replace(
                        tags
                          .preset,
                        i
                          .prompt,
                      )
                    : i
                      .prompt,
                },
              }
          : {
              system: {
                role: "system",
                content: i
                  .prompt
                  .system,
              },
              user: {
                role: "user",
                content: i
                  .prompt
                  .user,
              },
            };
      const messages =
        "system" in messageBox
          ? [
              messageBox
                .system,
              messageBox
                .user,
            ] as GptMessages<true>
          : [
              messageBox
                .user,
            ] as GptMessages;

      return {
        api: [
          api
            .host,
          api
            .version,
          api
            .action,
        ]
          .join(
            "/",
          ),
        header: {
          auth: id
            .token,
          org: id
            .org,
        },
        body: {
          messages,
          model: models[i.model],
          max_tokens: i
            .token
            .toString(),
          temperature: i
            .temperature
            .toString(),
          top_p: i
            .p
            .toString(),
        },
      };
    }
  }
}

new GPT.GPT()
  .run();
