interface IEngineBase {
  prepend?: string;
  separator?: string;
}

export type IEngine<
  Engine extends string,
  Action = stringful,
> = IEngineBase & Record<Engine, Action>;
