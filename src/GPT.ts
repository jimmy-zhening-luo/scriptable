// icon-color: orange; icon-glyph: comment-alt;
import Shortcut from "./lib";

class GPT extends Shortcut<
  GptInput,
  GptOutput,
  GptSetting
> {
  protected runtime() {
    const {
      header,
      api: { host, version, actions },
      models,
      tags,
      defaults,
    } = this.setting,
    input = (input => typeof input !== "string" && "prompt" in input
      ? input
      : { prompt: input })(this.inputful),
    preset = this.subsetting<GptPreset>(input.preset ?? defaults.preset),
    get = <Kind extends "placeholders" | "sliders">(
      kind: Kind,
      option: keyof (GptSetting["defaults"][Kind]),
      sideload?: string,
    ) => String(
      (input as Partial<GptSetting["defaults"][Kind]>)[option]
      ?? (preset[kind] as undefined | Partial<GptSetting["defaults"][Kind]>)?.[option]
      ?? sideload
      ?? defaults[kind][option],
    ),
    options = {
      sliders: {
        temperature: get("sliders", "temperature"),
        top_p: get("sliders", "top_p"),
      },
      placeholders: {
        date: get("placeholders", "date", GPT.date()),
        location: get("placeholders", "location"),
      },
    },
    { user, system = null } = ((
      { prompt: input },
      { prompt: preset },
      { prompt: tag },
    ) => typeof input !== "string"
      ? input
      : {
          ...preset,
          user: "user" in preset
            ? preset.user.includes(tag)
              ? preset.user.replace(tag, input)
              : `${preset.user}\n\n${input}`
            : input,
        })(input, preset, tags),
    messages = (system === null
      ? [{ role: "user", content: user }] as const
      : [
          { role: "system", content: system },
          { role: "user", content: user },
        ] as const
    ).map(({ role, content }) => {
      return {
        role,
        content: ([...Object.keys(tags.placeholders)] as (keyof typeof tags.placeholders)[]).reduce(
          (content, placeholder) => content.replaceAll(
            tags.placeholders[placeholder],
            options.placeholders[placeholder],
          ),
          !("plugins" in preset)
            ? content
            : Object.keys(preset.plugins).reduce(
              (content, plugin) => content.replaceAll(`{{${plugin}}}`, input.plugins?.[plugin] ?? preset.plugins?.[plugin] ?? ""),
              content,
            ),
        ),
      };
    }),
    { model = null, action = null } = models[input.model ?? preset.model ?? defaults.model] ?? {};

    if (model === null || action === null)
      throw new ReferenceError("Model not found");

    return {
      header,
      api: `${host}/${version}/${actions[action]}`,
      body: { model, messages, ...options.sliders },
    };
  }
}

new GPT().run();
