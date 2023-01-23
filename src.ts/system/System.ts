const BOOT_DIR: string = "!boot";
const BOOT_MODULE: string = [
  ".",
  BOOT_DIR,
  "Boot"
].join("/");

const Boot = importModule(BOOT_MODULE);
const ReadOnlyFile = importModule(
  "file/ReadOnlyFile"
);
const Bookmark = importModule(
  "file/Bookmark"
  );

type SystemConfig = typeof import("./system.json");

type DirAddress = {
  readonly bookmark?: string | undefined;
  readonly subpath?: string | undefined;
}

class _System {
  static get config(): SystemConfig {
    return JSON.parse(
      new ReadOnlyFile(
        System.systemDir,
        Boot.SYSTEM_CONFIG_FILE
      )
      .data
    ) as SystemConfig;
  }
  
  static get root(): ReadOnlyFile {
    return new ReadOnlyFile(
      new Bookmark(
        Boot.ROOT_BOOKMARK
      )
    );
  }
  
  static get bootDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      BOOT_DIR as string
    );
  }
  
  static get systemDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      Boot.SYSTEM_DIR as string
    );
  }
  
  static get configDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      System.config.system
        ["prod"]
        ["dirs"]
        ["config"] as string
    );
  }
  
  static get configSource(): ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .config
      .dir as DirAddress;
    return new ReadOnlyFile(
      new Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
    );
  }
  
  static get libDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      System.config.system
        .prod
        .dirs
        .lib as string
    );
  }
  
  static get libSource(): ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .lib
      .dir as DirAddress;
    return new ReadOnlyFile(
      new Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }
  
  static get dataDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      System.config.system
        .prod
        .dirs
        .data as string
    );
  }
  
  static get programDir(): ReadOnlyFile {
    return new ReadOnlyFile(
      System.root as ReadOnlyFile,
      System.config.system
        .prod
        .dirs
        .program as string
    );
  }
  
  static get programSource(): ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .program
      .dir as DirAddress;
    return new ReadOnlyFile(
      new Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }
  
  static get protectedFilePrefix(): string {
    return String(
      System.config.system
        .prod
        .protected
        .filePrefix
    );
  }
  
  static get externalSecretsDir(): ReadOnlyFile {
    const ext: DirAddress = System.config.system
      .external
      .secrets
      .dir as DirAddress;
    return new ReadOnlyFile(
      new Bookmark(
        ext.bookmark as (string|undefined) ?? String()
      ),
      ext.subpath as (string|undefined) ?? String()
    );
  }
  
  static clean(): void {
    System.cleanConfigs();
    System.cleanLibraries();
    System.cleanPrograms();
  }
  
  static install(): void {
    System.clean();
    System.installConfigs();
    System.installLibraries();
    System.installPrograms();
  }
  
  static cleanConfigs(): void {
    
  }
  
  static installConfigs(): void {
    System.cleanConfigs();
    const fm: FileManager = FileManager.iCloud();
    
    const here: string = System.configDir.path;
    const destination: string = here;
      
    const there: string = System.configSource.path;
    const source: string = there;
    
    if (fm.isDirectory(destination))
      fm.remove(destination);
    
    fm.copy(source, destination);
  }
  
  static cleanLibraries(): void {
    
  }
  
  static installLibraries(): void {
    System.cleanLibraries();
    const fm: FileManager = FileManager.iCloud();
    
    const here: string = System.libDir.path;
    const destination: string = here;
      
    const there: string = System.libSource.path;
    const source: string = there;
    
    if (fm.isDirectory(destination))
      fm.remove(destination);
      
    fm.copy(source, destination);
  }
  
  static cleanPrograms(): void {
    
  }
  
  static installPrograms(): void {
    System.cleanPrograms();
    const confirm: Alert = new Alert();
    confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
    confirm.addDestructiveAction("Yes, DELETE prod");
    confirm.addCancelAction("No, cancel");
    confirm.present().then((value: number) => (pull(value)));
    
    function pull(
      value: number = -1
    ): void {
      if (value === 0) {
        const fm: FileManager = FileManager.iCloud();
        const here: string = System.programDir.path;
        const destination: string = here;
          
        const there: string = System.programSource.path;
        const source: string = there;
        
        const dScripts: string[] = fm
          .listContents(
            destination
          ).filter((leaf: string) => (
            !leaf.startsWith(System.protectedFilePrefix)
            && !(leaf === System.libDir.leaf)
            && !(leaf === System.bootDir.leaf)
            && !(leaf === System.dataDir.leaf)
            && !(leaf === System.configDir.leaf)
            && !(leaf === System.systemDir.leaf)
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
            source
          );
        
        for (const leaf of sScripts) {
          const sFile: string = fm.joinPath(
            source,
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

const File = importModule(
  "file/File"
);
module.exports = _System;
module.exports.File = File;
module.exports.ReadOnlyFile = ReadOnlyFile;
module.exports.Bookmark = Bookmark;
