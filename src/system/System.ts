namespace System {
  const BOOT_RUNTIME_ROOT_SUBPATH: string = "!boot";
  const BOOT_FILENAME: string = "Boot";

  const SYSTEM_CONFIG_FILENAME: string = "system.json";
  type SYSTEM_CONFIG_INTERFACE = typeof import("./system.json");

  export class Runtime {
    private static get BOOT() {
      return importModule(
        [
          ".",
          BOOT_RUNTIME_ROOT_SUBPATH,
          BOOT_FILENAME
        ]
          .join("/")
      );
    }

    static get Bookmark() {
      return Runtime.File.Bookmark;
    }

    static get File() {
      return importModule("file/File");
    }

    static get ReadOnlyFile() {
      return Runtime.File.ReadOnlyFile;
    }

    static get Secret() {
      return importModule("secret/Secret");
    }

    private static get CONFIG(): SYSTEM_CONFIG_INTERFACE {
      return JSON.parse(
        new Runtime.ReadOnlyFile(
          Runtime.systemRuntimeDir,
          SYSTEM_CONFIG_FILENAME
        )
          .data
      ) as SYSTEM_CONFIG_INTERFACE;
    }

    static get runtimeRootDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        new Runtime.Bookmark(
          Runtime.BOOT.RUNTIME_ROOT_BOOKMARK
        )
      );
    }

    private static get BOOT_RUNTIME(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        BOOT_RUNTIME_ROOT_SUBPATH
      );
    }

    static get systemRuntimeDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.BOOT.SYSTEM_RUNTIME_ROOT_SUBPATH
      );
    }

    static get configRuntimeDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .config
      );
    }

    static get libRuntimeDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .lib
      );
    }

    static get storageRuntimeDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .storage
      );
    }

    static get programsRuntimeDir(): typeof Runtime.ReadOnlyFile {
      return new Runtime.ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .programs
      );
    }

    static get configSourceRepoDir(): typeof Runtime.ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .config as Runtime.Address;
      return new Runtime.ReadOnlyFile(
        new Runtime.Bookmark(
          sourceRepo.bookmark as (string | undefined) ?? String()
        ),
        sourceRepo.subpath as (string | undefined) ?? String()
      );
    }


    static get libSourceRepoDir(): typeof Runtime.ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .lib as Runtime.Address;
      return new Runtime.ReadOnlyFile(
        new Runtime.Bookmark(
          sourceRepo.bookmark as (string | undefined) ?? String()
        ),
        sourceRepo.subpath as (string | undefined) ?? String()
      );
    }

    static get programsSourceRepoDir(): typeof Runtime.ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .programs as Runtime.Address;
      return new Runtime.ReadOnlyFile(
        new Runtime.Bookmark(
          sourceRepo.bookmark as (string | undefined) ?? String()
        ),
        sourceRepo.subpath as (string | undefined) ?? String()
      );
    }

    private static get protectedFilePrefixes(): Array<string> {
      return Runtime.CONFIG
        .system
        .runtime
        .protected
        .filePrefixes;
    }

    private static cleanDependencies(): void {
      Runtime.cleanConfigs();
      Runtime.cleanLibraries();
    }

    static install(): void {
      Runtime.cleanDependencies();
      Runtime.installConfigs();
      Runtime.installLibraries();
      Runtime.installPrograms();
    }

    private static cleanConfigs(): void {
      const fm: FileManager = FileManager.iCloud();

      const here: string = Runtime.configRuntimeDir.path;
      const destination: string = here;

      if (fm.isDirectory(destination))
        fm.remove(destination);
    }

    private static installConfigs(): void {
      Runtime.cleanConfigs();
      const fm: FileManager = FileManager.iCloud();

      const here: string = Runtime.configRuntimeDir.path;
      const destination: string = here;

      const there: string = Runtime.configSourceRepoDir.path;
      const sourceRepo: string = there;

      fm.copy(sourceRepo, destination);
    }

    private static cleanLibraries(): void {
      const fm: FileManager = FileManager.iCloud();

      const here: string = Runtime.libRuntimeDir.path;
      const destination: string = here;

      if (fm.isDirectory(destination))
        fm.remove(destination);
    }

    private static installLibraries(): void {
      Runtime.cleanLibraries();
      const fm: FileManager = FileManager.iCloud();

      const here: string = Runtime.libRuntimeDir.path;
      const destination: string = here;

      const there: string = Runtime.libSourceRepoDir.path;
      const sourceRepo: string = there;

      fm.copy(sourceRepo, destination);
    }

    private static installPrograms(): void {
      const confirm: Alert = new Alert();
      confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current runtime files?";
      confirm.addDestructiveAction("Yes, DELETE runtime");
      confirm.addCancelAction("No, cancel");
      confirm.present().then((value: number) => (pull(value)));

      function pull(
        value: number = -1
      ): void {
        if (value === 0) {
          const fm: FileManager = FileManager.iCloud();
          const here: string = Runtime.programsRuntimeDir.path;
          const destination: string = here;

          const there: string = Runtime.programsSourceRepoDir.path;
          const sourceRepo: string = there;

          const dScripts: string[] = fm
            .listContents(
              destination
            ).filter((leaf: string) => (
              !(Runtime
                .protectedFilePrefixes
                .some(
                  (prefix: string) => (
                    leaf.startsWith(prefix)
                  )
                )
              )
              && !(leaf === Runtime.libRuntimeDir.leaf)
              && !(leaf === Runtime.BOOT_RUNTIME.leaf)
              && !(leaf === Runtime.storageRuntimeDir.leaf)
              && !(leaf === Runtime.configRuntimeDir.leaf)
              && !(leaf === Runtime.systemRuntimeDir.leaf)
              && !(leaf === ".Trash")
            ));

          for (const leaf of dScripts) {
            const dFile: string = fm.joinPath(
              destination,
              leaf
            );
            console.log(dFile);
            fm.remove(dFile);
          }

          const sScripts: string[] = fm
            .listContents(
              sourceRepo
            );

          for (const leaf of sScripts) {
            const sFile: string = fm.joinPath(
              sourceRepo,
              leaf
            );
            const dFile: string = fm.joinPath(
              destination,
              leaf
            );
            console.log([sFile, dFile]);
            fm.copy(sFile, dFile);
          }
        }
      }
    }
  }

  export namespace Runtime {
    export type Address = {
      readonly bookmark?: string | undefined;
      readonly subpath?: string | undefined;
    }
  }
}

module.exports = System;
