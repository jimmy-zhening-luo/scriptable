
class Storage {
  readonly file: typeof Storage.File;
  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath?: string | undefined
  ) {
    this.file = new Storage.File(
      Storage.System.storageRuntimeDir,
      Storage.File.joinPaths(
        Storage.File.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath ?? String("default.txt")
      )
    );
  }

  private static get System() {
    return importModule("./system/System");
  }

  private static get File() {
    return Storage.System.File;
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
