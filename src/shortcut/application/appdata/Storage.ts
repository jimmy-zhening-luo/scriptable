
class Storage {
  readonly file: File;
  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath?: string | undefined
  ) {
    this.file = new File(
      Boot.storageRuntimeDir,
      File.joinPaths(
        File.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath ?? String("default.txt")
      )
    );
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
