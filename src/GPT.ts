// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comment-alt;
"use strict";

import type { Shortcut } from "./lib";

class GPT extends importModule<typeof Shortcut<
  GptInput,
  GptOutput,
  GptSetting
>>("./lib") {
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
    model = models[input.model ?? preset.model ?? defaults.model] as GptSetting["models"][string],
    slider = {
      temperature: input.temperature ?? preset.slider?.temperature ?? defaults.slider.temperature,
      top_p: input.top_p ?? preset.slider?.top_p ?? defaults.slider.top_p,
    },
    placeholder = {
      date: input.date ?? preset.placeholder?.date ?? this.date(),
      location: input.location ?? preset.placeholder?.location ?? defaults.placeholder.location,
    },
    prompt = typeof input.prompt !== "string"
      ? input.prompt
      : "model" in input
        ? { user: input.prompt }
        : {
            ..."system" in preset.prompt
              ? { system: preset.prompt.system }
              : {},
            user: "user" in preset.prompt
              ? preset.prompt.user.includes(placeholders.insert)
                ? preset.prompt.user.replace(
                  placeholders.insert,
                  input.prompt,
                )
                : `${preset.prompt.user}\n\n${input.prompt}`
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
                  (c, p) => c.replaceAll(`{{${p}}}`, input.plugins?.[p] ?? preset.plugins?.[p] ?? ""),
                  content,
                )
              : content
          )
            .replaceAll(placeholders.location, placeholder.location)
            .replaceAll(placeholders.date, placeholder.date),
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
        temperature: String(slider.temperature),
        top_p: String(slider.top_p),
      },
    };
  }

  private unpack(inputful: GPT["inputful"]): GptInputWrap {
    return typeof inputful !== "string" && "prompt" in inputful
      ? inputful
      : { prompt: inputful };
  }
}

new GPT().run();
