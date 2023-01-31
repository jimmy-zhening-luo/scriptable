const STORAGE_DIR_SUBPATH_FROM_ROOT = "storage";

class Storage {
  readonly file: File;
  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {

    this.file = new File(
      this.storageDirFile as File,
      File.joinPaths(
        File.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath
      )
    );
  }

  protected get storageDirFile(): File {
    return new File(new Bookmark(Installer.runtimeRootBookmarkName), this.storageDirSubpathFromRoot);
  }

  protected get storageDirSubpathFromRoot(): string {
    return STORAGE_DIR_SUBPATH_FROM_ROOT;
  }

  get path(): string {
    return this.file.path as string;
  }

  get data(): string {
    return this.file.data as string;
  }

  read(): string {
    return this.data;
  }

  write(
    text: string
  ): void {
    const overwrite: boolean = true;
    this.file.write(
      text,
      overwrite
    );
  }

  toString(): string {
    return this.data;
  }
}
