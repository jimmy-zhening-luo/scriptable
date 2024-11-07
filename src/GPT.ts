// icon-color: orange; icon-glyph: comment-alt;
import Shortcut from "./lib";

class GPT extends Shortcut<
  GptInput,
  GptOutput,
  GptSetting
> {
  protected runtime() {
    const { inputful, setting } = this,
    {
      api: { host, version, actions },
      id,
      models,
      defaults,
      placeholders,
    } = setting,
    input = typeof inputful !== "string" && "prompt" in inputful
      ? inputful
      : { prompt: inputful },
    preset = this.subsetting<GptPreset>(
      "preset" in input
        ? input.preset
        : defaults.preset,
    ),
    model = models[input.model ?? preset.model ?? defaults.model];

    if (typeof model === "undefined")
      throw new Error("Model not found.");

    const getSlider = (option: keyof GptSetting["defaults"]["slider"]) => input[option] ?? preset.slider?.[option] ?? defaults.slider[option],
    getPlaceholder = (option: keyof GptSetting["defaults"]["placeholder"], replacement?: string) => input[option] ?? preset.placeholder?.[option] ?? replacement ?? (defaults.slider as unknown as typeof defaults["placeholder"] & Record<"date", string>)[option],
    sliders = {
      temperature: getSlider("temperature"),
      top_p: getSlider("top_p"),
    },
    placeholder = {
      date: getPlaceholder("date", GPT.date()),
      location: getPlaceholder("location"),
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
        temperature: String(sliders.temperature),
        top_p: String(sliders.top_p),
      },
    };
  }
}

new GPT().run();
