interface GptModel {
  id: string;
  action: Keys<GptSetting["app"]["api"]["action"]>;
}
