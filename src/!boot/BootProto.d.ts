declare interface BootProto {
  boot: {
    publishedUrl: string,
    fileBookmarks: ScriptableBootFileBookmarksRecords,
    specialPrefix: string,
  }
}

declare interface ScriptableBootFileBookmarksRecords extends BootFileBookmarksRecordsProto {
  runtime: string,
  built: string,
}

declare type BootFileBookmarksRecordsProto = {
  [key: string]: string,
}
