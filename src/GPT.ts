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
        api: { host, version, action },
        id,
        models,
        plugins,
        defaults,
      } = setting,
      input = this.unpack(inputful),
      preset = this.subsetting<GptPreset>(
        "preset" in input
          ? input.preset
          : defaults.preset,
      ),
      model = models[this.has("model", input, preset, defaults)] as GptSetting["models"][string],
      plugs = {
        input: input.plugins,
        preset: preset.plugins,
      },
      option = {
        temperature: this.has("temperature", input, preset, defaults),
        p: this.has("p", input, preset, defaults),
        location: this.has("location", input, preset, defaults),
        date: input.date ?? preset.date ?? this.dateprint(),
      },
      promptT = typeof input.prompt !== "string"
        ? input.prompt
        : "model" in input
          ? { user: input.prompt }
          : {
              ..."system" in preset
                ? { system: preset.system }
                : {},
              user: "user" in preset
                ? preset.user.includes(plugins.preset)
                  ? preset.user.replace(plugins.preset, input.prompt)
                  : `${preset.user}\n\n${input.prompt}`
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
            .keys(plugs.preset)
            .reduce(
              (message, p) => message.replaceAll(`{{${p}}}`, plugs.input?.[p] ?? plugs.preset[p] ?? ""),
              messageT,
            )
            .replaceAll(plugins.location, option.location)
            .replaceAll(plugins.date, option.date),
        ] as const)
        .map(([role, content]) => { return { role, content }; });

      return {
        api: [host, version, action[model.action]].join("/"),
        header: id,
        body: {
          messages,
          model: model.id,
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
      preset: GptOpts,
      defaults: GptSetting["defaults"],
    ) {
      return input[option] ?? preset[option] ?? defaults[option];
    }
  }
}

(new GPT.GPT).run();
