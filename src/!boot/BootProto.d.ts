declare interface BootProto {
  boot: {
    fileBookmarks: ScriptableBootFileBookmarksRecords,
    specialPrefix: string,
  }
}

declare interface ScriptableBootFileBookmarksRecords extends BootFileBookmarksRecordsProto {
  runtime: string,
  repo: string,
  built: string,
}

declare type BootFileBookmarksRecordsProto = {
  [key: string]: string,
}
