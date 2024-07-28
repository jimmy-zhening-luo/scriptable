// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comment-alt;
"use strict";

namespace GPT {
  const shortcut = importModule<typeof Shortcut>("system/Shortcut");

  export class GPT extends shortcut<
    GptInput,
    GptOutput,
    GptSetting
  > {
    protected runtime() {
      const { app, user } = this.setting,
      {
        api,
        models,
        limit,
        tags,
      } = app,
      {
        id,
        presets,
        defaults: {
          model,
          preset,
          location,
          token,
          temperature,
          p,
        },
      } = user,
      input = this.inputful,
      wrap = typeof input !== "string" && "prompt" in input
        ? input
        : { prompt: input },
      opts = {
        model: "model" in wrap && String(wrap.model) in models
          ? wrap.model
          : model,
        token: "token" in wrap && wrap.token >= limit.token.min && wrap.token <= limit.token.max
          ? wrap.token
          : token,
        temperature: "temperature" in wrap && wrap.temperature >= limit.temperature.min && wrap.temperature <= limit.temperature.max
          ? wrap.temperature
          : temperature,
        p: "p" in wrap && wrap.p >= limit.p.min && wrap.p <= limit.p.max
          ? wrap.p
          : p,
        preset: "preset" in wrap && wrap.preset in presets
          ? wrap.preset
          : preset,
        location: wrap.location ?? location,
        date: wrap.date ?? (new this.timeprint).date,
      },
      presetConfig = presets[opts.preset] ?? null,
      [presetPlugins, plugins] = presetConfig === null || !("plugins" in presetConfig)
        ? [{}, {}]
        : [
            presetConfig.plugins,
            wrap.plugins ?? {},
          ],
      plugs = Object.keys(presetPlugins),
      promptTemplate = typeof wrap.prompt !== "string"
        ? wrap.prompt
        : presetConfig === null
          ? { user: wrap.prompt }
          : {
              system: presetConfig.system,
              user: "user" in presetConfig && presetConfig.user.includes(tags.preset)
                ? presetConfig.user.replace(
                  tags.preset,
                  wrap.prompt,
                )
                : wrap.prompt,
            },
      messagesTemplate = "system" in promptTemplate
        ? [
            ["system", promptTemplate.system],
            ["user", promptTemplate.user],
          ] as const
        : [["user", promptTemplate.user]] as const,
      messagesFilled = messagesTemplate
        .map(
          ([role, prompt]) => [
            role,
            plugs.reduce(
              (
                tagged,
                plug,
              ) => tagged.replaceAll(
                `{{${plug}}}`,
                plugins[plug] ?? presetPlugins[plug] ?? "",
              ),
              prompt,
            )
              .replaceAll(
                tags.location,
                opts.location,
              )
              .replaceAll(
                tags.date,
                opts.date,
              ),
          ] as const,
        ),
      messages = messagesFilled
        .map(([role, content]) => { return { role, content }; });

      return {
        api: [
          api.host,
          api.version,
          api.action[opts.model],
        ]
          .join("/"),
        header: { auth: id.token, org: id.org },
        body: {
          messages,
          model: models[opts.model],
          max_tokens: String(opts.token),
          temperature: String(opts.temperature),
          top_p: String(opts.p),
        },
      };
    }
  }
}

(new GPT.GPT).run();
