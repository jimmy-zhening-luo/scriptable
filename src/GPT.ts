// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comment-alt;
"use strict";

import type { Shortcut } from "./system/Shortcut";

namespace GPT {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class GPT extends shortcut<GptInput, GptOutput, GptSetting> {
    protected runtime() {
      function has<T extends "model" | "preset">(
        option: T,
        thing: Record<string, unknown>,
        input: Partial<GptOpts>,
        preset: Partial<GptOpts>,
        defaults: GptOpts,
      ) {
        return typeof input[option] !== "undefined" && input[option] in thing
          ? input[option]
          : typeof preset[option] !== "undefined" && preset[option] in thing
            ? preset[option]
            : defaults[option];
      }

      function bounded<T extends "token" | "temperature" | "p">(
        option: T,
        limit: Record<T, Boundary>,
        input: Partial<GptOpts>,
        preset: Partial<GptOpts>,
        defaults: GptOpts,
      ) {
        return typeof input[option] !== "undefined" && input[option] >= limit[option].min && input[option] <= limit[option].max
          ? input[option]
          : typeof preset[option] !== "undefined" && preset[option] >= limit[option].min && preset[option] <= limit[option].max
            ? preset[option]
            : defaults[option];
      }

      const { inputful, setting } = this,
      {
        app: {
          api: { host, version, action },
          models,
          limit,
          tags,
        },
        user: { id, presets, defaults },
      } = setting,
      input = typeof inputful !== "string" && "prompt" in inputful
        ? inputful
        : { prompt: inputful },
      presetId = has(
        "preset",
        presets,
        input,
        {},
        defaults,
      ),
      preset = presets[presetId] ?? null,
      [presetPlugins, plugins] = preset !== null && "plugins" in preset
        ? [
            preset.plugins,
            input.plugins ?? {},
          ]
        : [{}, {}],
      option = {
        model: has(
          "model",
          models,
          input,
          preset ?? {},
          defaults,
        ),
        token: bounded(
          "token",
          limit,
          input,
          preset ?? {},
          defaults,
        ),
        temperature: bounded(
          "temperature",
          limit,
          input,
          preset ?? {},
          defaults,
        ),
        p: bounded(
          "p",
          limit,
          input,
          preset ?? {},
          defaults,
        ),
        location: input.location ?? defaults.location,
        date: input.date ?? this.dateprint(),
      },
      promptTemplate = typeof input.prompt !== "string"
        ? input.prompt
        : preset !== null && "system" in preset
          ? {
              system: preset.system,
              user: "user" in preset && preset.user.includes(tags.preset)
                ? preset.user.replace(tags.preset, input.prompt)
                : input.prompt,
            }
          : { user: input.prompt },
      messagesTemplate = "system" in promptTemplate
        ? [
            ["system", promptTemplate.system],
            ["user", promptTemplate.user],
          ] as const
        : [["user", promptTemplate.user]] as const,
      messagesFilled = messagesTemplate.map(([role, prompt]) => [
        role,
        Object
          .keys(presetPlugins)
          .reduce((tagged, plug) => tagged.replaceAll(`{{${plug}}}`, plugins[plug] ?? presetPlugins[plug] ?? ""), prompt)
          .replaceAll(tags.location, option.location)
          .replaceAll(tags.date, option.date),
      ] as const),
      messages = messagesFilled.map(([role, content]) => { return { role, content }; });

      return {
        api: [host, version, action[option.model]].join("/"),
        header: id,
        body: {
          messages,
          model: models[option.model],
          max_tokens: String(option.token),
          temperature: String(option.temperature),
          top_p: String(option.p),
        },
      };
    }
  }
}

(new GPT.GPT).run();
