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
        api: { host, version, actions },
        id,
        models,
        defaults,
        placeholders,
      } = setting,
      input = this.unpack(inputful),
      preset = this.subsetting<GptPreset>(
        "preset" in input
          ? input.preset
          : defaults.preset,
      ),
      model = models[this.has("model", input, preset, defaults)] as GptSetting["models"][string],
      option = {
        temperature: this.has("temperature", input, preset, defaults),
        p: this.has("p", input, preset, defaults),
        location: this.has("location", input, preset, defaults),
        date: this.has("date", input, preset, { date: this.dateprint() }),
      },
      prompt = typeof input.prompt !== "string"
        ? input.prompt
        : "model" in input
          ? { user: input.prompt }
          : {
              ..."system" in preset
                ? { system: preset.system }
                : {},
              user: "user" in preset
                ? preset.user.includes(placeholders.preset)
                  ? preset.user.replace(placeholders.preset, input.prompt)
                  : `${preset.user}\n\n${input.prompt}`
                : input.prompt,
            },
      messages = (
        "system" in prompt
          ? [
              { role: "system", content: prompt.system },
              { role: "user", content: prompt.user },
            ] as const
          : [{ role: "user", content: prompt.user }] as const
      )
        .map(({ role, content }) => {
          return {
            role,
            content: (
              "plugins" in preset
                ? Object
                  .keys(preset.plugins)
                  .reduce(
                    (c, p) => c.replaceAll(`{{${p}}}`, input.plugins?.[p] ?? preset.plugins[p] ?? ""),
                    content,
                  )
                : content
            )
              .replaceAll(placeholders.location, option.location)
              .replaceAll(placeholders.date, option.date),
          };
        });

      return {
        api: [
          host,
          version,
          actions[model.action],
        ].join("/"),
        header: id,
        body: {
          messages,
          model: model.name,
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

    private has<T extends Keys<GptSetting["defaults"]>>(
      option: T,
      input: GptInputWrap,
      preset: GptOptions,
      defaults: GptSetting["defaults"],
    ) {
      return input[option] ?? preset[option] ?? defaults[option];
    }
  }
}

(new GPT.GPT).run();
