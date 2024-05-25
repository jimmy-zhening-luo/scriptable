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
    protected runtime() {
      const {
        app: {
          tags,
          api,
          models,
          limit,
        },
        user: {
          id,
          defaults: {
            model,
            token,
            temperature,
            p,
            preset,
            location,
          },
          presets,
        },
      } = this
        .setting;
      const input = this
        .inputful;
      const wrap =
        typeof input !== "string"
        && "prompt" in input
          ? input
          : { prompt: input };
      const opts = {
        model:
          "model" in wrap
          && String(wrap
            .model) in models
            ? wrap
              .model
            : model,
        token:
          "token" in wrap
          && wrap
            .token >= limit
            .token
            .min
            && wrap
              .token <= limit
              .token
              .max
            ? wrap
              .token
            : token,
        temperature:
          "temperature" in wrap
          && wrap
            .temperature >= limit
            .temperature
            .min
            && wrap
              .temperature <= limit
              .temperature
              .max
            ? wrap
              .temperature
            : temperature,
        p:
          "p" in wrap
          && wrap
            .p >= limit
            .p
            .min
            && wrap
              .p <= limit
              .p
              .max
            ? wrap
              .p
            : p,
        preset:
          "preset" in wrap
          && wrap
            .preset in presets
            ? wrap
              .preset
            : preset,
        location:
          wrap
            .location
            ?? location,
        date:
          wrap
            .date
            ?? new this
              .Timeprint()
              .date,
      };
      const presetConfig = presets[
        opts
          .preset
      ]
      ?? null;
      const [
        presetPlugins,
        plugins,
      ] =
        presetConfig === null
        || !("plugins" in presetConfig)
          ? [
              {},
              {},
            ]
          : [
              presetConfig
                .plugins,
              wrap
                .plugins
                ?? {},
            ];
      const plugs = Object
        .keys(
          presetPlugins,
        );
      const promptTemplate = typeof wrap
        .prompt !== "string"
        ? wrap
          .prompt
        : presetConfig === null
          ? {
              user: wrap
                .prompt,
            }
          : {
              system: presetConfig
                .system,
              user:
                  "user" in presetConfig
                  && presetConfig
                    .user
                    .includes(
                      tags
                        .preset,
                    )
                    ? presetConfig
                      .user
                      .replace(
                        tags
                          .preset,
                        wrap
                          .prompt,
                      )
                    : wrap
                      .prompt,
            };
      const messagesTemplate = "system" in promptTemplate
        ? [
            [
              "system",
              promptTemplate
                .system,
            ],
            [
              "user",
              promptTemplate
                .user,
            ],
          ] as const
        : [
            [
              "user",
              promptTemplate
                .user,
            ],
          ] as const;
      const messagesFilled = messagesTemplate
        .map(
          ([
            role,
            prompt,
          ]) =>
            [
              role,
              plugs
                .reduce(
                  (
                    tagged,
                    plug,
                  ) =>
                    tagged
                      .replaceAll(
                        `{{${
                          plug
                        }}}`,
                        plugins[
                          plug
                        ]
                        ?? presetPlugins[
                          plug
                        ]
                        ?? "",
                      ),
                  prompt,
                )
                .replaceAll(
                  tags
                    .location,
                  opts
                    .location,
                )
                .replaceAll(
                  tags
                    .date,
                  opts
                    .date,
                ),
            ] as const,
        );
      const messages = messagesFilled
        .map(
          ([
            role,
            content,
          ]) => {
            return {
              role,
              content,
            };
          },
        );

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
          model: models[
            opts
              .model
          ],
          max_tokens: opts
            .token
            .toString(),
          temperature: opts
            .temperature
            .toString(),
          top_p: opts
            .p
            .toString(),
        },
      };
    }
  }
}

new GPT.GPT()
  .run();
