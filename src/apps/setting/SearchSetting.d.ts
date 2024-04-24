declare type SearchSettings = {
  app: SearchAppSettings;
  user: SearchUserSettings;
};

declare type SearchUserSettings = {
  engines: SearchEngineSetting[];
};

declare type SearchAppSettings = {
  tag: string;
  chat: string;
  translate: string;
  math?: string[];
};
