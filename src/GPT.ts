// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comment-alt;
"use strict";

import type { Shortcut } from "./system/Shortcut";

namespace GPT {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class GPT extends shortcut<GptInput, GptOutput, GptSetting> {
    protected runtime() {
      const { inputful, setting } = this,
      {
        app: {
          api: { host, version, action },
          models,
          limits,
          tags,
        },
        user: { id, presets, defaults },
      } = setting,
      input = this.unpack(inputful),
      presetId = this.has(
        "preset",
        presets,
        input,
        {},
        defaults,
      ),
      preset = presets[presetId] ?? null,
      plugins = {
        input: input.plugins ?? {},
        preset: preset === null
          ? {}
          : preset.plugins ?? {},
      },
      option = {
        model: this.has(
          "model",
          models,
          input,
          preset ?? {},
          defaults,
        ),
        token: this.bounded(
          "token",
          limits,
          input,
          preset ?? {},
          defaults,
        ),
        temperature: this.bounded(
          "temperature",
          limits,
          input,
          preset ?? {},
          defaults,
        ),
        p: this.bounded(
          "p",
          limits,
          input,
          preset ?? {},
          defaults,
        ),
        location: input.location ?? defaults.location,
        date: input.date ?? this.dateprint(),
      },
      promptT = typeof input.prompt !== "string"
        ? input.prompt
        : preset === null
          ? { user: input.prompt }
          : {
              ..."system" in preset
                ? { system: preset.system }
                : {},
              user: "user" in preset
                ? preset.user.includes(tags.preset)
                  ? preset.user.replace(tags.preset, input.prompt)
                  : [preset.user, input.prompt].join("\n\n")
                : input.prompt,
            },
      messagesT = "system" in promptT
        ? [
            ["system", promptT.system],
            ["user", promptT.user],
          ] as const
        : [["user", promptT.user]] as const,
      messages = messagesT
        .map(([role, messageT]) => [
          role,
          Object
            .keys(plugins.preset)
            .reduce(
              (message, p) => message.replaceAll(`{{${p}}}`, plugins.input[p] ?? plugins.preset[p] ?? ""),
              messageT,
            )
            .replaceAll(tags.location, option.location)
            .replaceAll(tags.date, option.date),
        ] as const)
        .map(([role, content]) => { return { role, content }; });

      return {
        api: [host, version, action[option.model]].join("/"),
        header: id,
        body: {
          messages,
          model: models[option.model],
          ...Math.round(option.token) < 1
            ? {}
            : { max_tokens: String(option.token) },
          temperature: String(option.temperature),
          top_p: String(option.p),
        },
      };
    }

    private unpack(inputful: GPT["inputful"]) {
      return typeof inputful !== "string" && "prompt" in inputful
        ? inputful
        : { prompt: inputful };
    }

    private has<T extends "model" | "preset">(
      option: T,
      table: Record<string, unknown>,
      input: Partial<GptOpts>,
      preset: Partial<GptOpts>,
      defaults: GptOpts,
    ) {
      return typeof input[option] !== "undefined" && input[option] in table
        ? input[option]
        : typeof preset[option] !== "undefined" && preset[option] in table
          ? preset[option]
          : defaults[option];
    }

    private bounded<T extends "token" | "temperature" | "p">(
      option: T,
      limits: Record<T, Boundary>,
      input: Partial<GptOpts>,
      preset: Partial<GptOpts>,
      defaults: GptOpts,
    ) {
      return typeof input[option] !== "undefined" && input[option] >= limits[option].min && input[option] <= limits[option].max
        ? input[option]
        : typeof preset[option] !== "undefined" && preset[option] >= limits[option].min && preset[option] <= limits[option].max
          ? preset[option]
          : defaults[option];
    }
  }
}

(new GPT.GPT).run();
