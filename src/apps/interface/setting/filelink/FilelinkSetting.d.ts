declare interface FilelinkSetting {
  providers: Table<FileProvider<true> | FileProvider<false>>;
  scheme: string;
  commonRoot: string;

}
