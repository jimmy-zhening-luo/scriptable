namespace System {
  const BOOT_RUNTIME_ROOT_SUBPATH: string = "!boot";
  const BOOT_FILENAME: string = "Boot";

  const SYSTEM_CONFIG_FILENAME: string = "system.json";
  type SYSTEM_CONFIG_INTERFACE = typeof import("./system.json");


  export const Explorer = importModule("explorer/Explorer");
  export const Files = Explorer.Files;
  export const File = Explorer.File;
  export const ReadOnlyFile = Explorer.ReadOnlyFile;
  export const Bookmark = Explorer.Bookmark;

  export class Runtime {
    private static get CONFIG(): SYSTEM_CONFIG_INTERFACE {
      return JSON.parse(
        new ReadOnlyFile(
          Runtime.systemRuntimeDir,
          SYSTEM_CONFIG_FILENAME
        )
          .data
      ) as SYSTEM_CONFIG_INTERFACE;
    }

    static get runtimeRootDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        new Bookmark(
          Runtime.Boot.RUNTIME_ROOT_BOOKMARK
        )
      );
    }

    private static get BOOT_RUNTIME(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        BOOT_RUNTIME_ROOT_SUBPATH
      );
    }

    static get systemRuntimeDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.Boot.SYSTEM_RUNTIME_ROOT_SUBPATH
      );
    }

    static get configRuntimeDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .config
      );
    }

    static get libRuntimeDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .lib
      );
    }

    static get storageRuntimeDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .storage
      );
    }

    static get programsRuntimeDir(): typeof ReadOnlyFile {
      return new ReadOnlyFile(
        Runtime.runtimeRootDir,
        Runtime.CONFIG
          .system
          .runtime
          .directories
          .rootSubpaths
          .programs
      );
    }

    static get configSourceRepoDir(): typeof ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .config as Runtime.Address;
      return new ReadOnlyFile(
        new Bookmark(
          sourceRepo.bookmark as (string | undefined) ?? String()
        ),
        sourceRepo.subpath as (string | undefined) ?? String()
      );
    }


    static get libSourceRepoDir(): typeof ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .lib as Runtime.Address;
      return new ReadOnlyFile(
        new Bookmark(
          sourceRepo.bookmark as (string | undefined) ?? String()
        ),
        sourceRepo.subpath as (string | undefined) ?? String()
      );
    }

    static get programsSourceRepoDir(): typeof ReadOnlyFile {
      const sourceRepo: Runtime.Address = Runtime.CONFIG
        .system
        .sourceRepo
        .directories
        .addresses
        .programs as Runtime.Address;
      return new ReadOnlyFile(
        new Bookmark(
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

    export const Boot = importModule(
      [
        ".",
        BOOT_RUNTIME_ROOT_SUBPATH,
        BOOT_FILENAME
      ].join("/")
    );
  }
}

module.exports = System;
