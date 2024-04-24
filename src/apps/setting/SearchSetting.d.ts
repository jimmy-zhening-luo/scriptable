declare interface SearchSettings {
  app: SearchAppSettings;
  user: SearchUserSettings;
}

declare interface SearchUserSettings {
  engines: SearchEngineSetting[];
}

declare interface SearchAppSettings {
  tag: string;
  chat: string;
  translate: string;
  math?: string[];

}
