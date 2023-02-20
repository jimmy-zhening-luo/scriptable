declare interface BootProto {
  boot: {
    fileBookmarks: ScriptableBootFileBookmarksRecords,
    phases: ScriptableBootPhaseRecords,
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

declare interface ScriptableBootPhaseRecords extends BootPhaseRecordsProto {
  clean: BootPhaseSettings,
  install: BootPhaseSettings,
}

declare type BootPhaseRecordsProto = {
  [key: string]: BootPhaseSettings,
}

declare interface BootPhaseSettings {
  files: BootFileCriteria,
}

declare interface BootFileCriteria {
  exclude?: BootFilenameMatchCriteria,
  include?: BootFilenameMatchCriteria,
}

declare interface BootFilenameMatchCriteria {
  prefix?: string[],
  suffix?: string[],
  directories?: boolean,
}
