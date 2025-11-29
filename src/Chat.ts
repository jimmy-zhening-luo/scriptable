"cyan comments";
import Shortcut from "./app";
import Api from "./lib/api";
import Time from "./lib/time";
import location from "./lib/location";
import type {
  Setting,
  Input,
  Response,
} from "./private/Chat";

await new class Chat extends Shortcut<
  Setting,
  Null<string> | Record<string, unknown>,
  Input
> {
  protected async runtime() {
    const { setting, input } = this;

    if (!input?.input)
      return null;

    const api = new Api(
      setting.api,
      undefined,
      {
        "Content-Type": "application/json",
        "OpenAI-Organization": setting.auth.org,
      },
      setting.auth.token,
    ),
    { prompt = setting.prompt } = input,
    { latitude, longitude } = await location(),
    now = new Time,
    { text, output } = (
      await api.request(
        "POST",
        undefined,
        undefined,
        {
          input: input.input,
          prompt: {
            id: prompt.id,
            variables: {
              latlong: latitude + "," + longitude,
              date: now.print("y-MM-dd"),
              time: now.print("HH:mm:00ZZZZZ"),
              f_date: now.print("MMMM d, y"),
              f_time: now.print("h:mm a"),
              timezone: now.print("VV"),
              weekday: now.print("EEEE"),
              ...input.variables ?? {},
            },
          },
          ...setting.options,
        },
      )
    ) as Response,
    payload = output.at(-1)!;

    if (payload.content) {
      const [{ text: answer }] = payload.content;

      if (text.format.schema) {
        const json = JSON.parse(answer) as FieldTable;

        return prompt.answer
          ? json[prompt.answer] ?? null
          : json;
      }

      return answer;
    }

    return payload.input
      ? { tool: payload.input }
      : null;
  }
}().run();
