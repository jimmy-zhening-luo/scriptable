const BOOT_DIR: string = "!boot";
const BOOT_MODULE: string = [
  ".",
  BOOT_DIR,
  "Boot"
].join("/");
  
type SystemConfig = typeof import("./system.json");

type DirAddress = {
  readonly bookmark?: string | undefined;
  readonly subpath?: string | undefined;
}

class System {
  static get Boot() {
    return importModule(BOOT_MODULE);
  }
  
  static get Bookmark() {
    return System.ReadOnlyFile.Bookmark;
  }
  
  static get ReadOnlyFile() {
    return importModule(
  "file/ReadOnlyFile"
  );
  }
  
  static get config(): SystemConfig {
    return JSON.parse(
      new System.ReadOnlyFile(
        System.systemDir,
        System.Boot.SYSTEM_CONFIG_FILE
      )
      .data
    ) as SystemConfig;
  }
  
  static get root(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      new System.Bookmark(
        System.Boot.ROOT_BOOKMARK
      )
    );
  }
  
  static get bootDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      BOOT_DIR
    );
  }
  
  static get systemDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      System.Boot.SYSTEM_DIR
    );
  }
  
  static get configDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      System.config.system
        ["prod"]
        ["dirs"]
        ["config"]
    );
  }
  
  static get configSource(): typeof System.ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .config
      .dir as DirAddress;
    return new System.ReadOnlyFile(
      new System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
    );
  }
  
  static get libDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      System.config.system
        .prod
        .dirs
        .lib
    );
  }
  
  static get libSource(): typeof System.ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .lib
      .dir as DirAddress;
    return new System.ReadOnlyFile(
      new System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }
  
  static get dataDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      System.config.system
        .prod
        .dirs
        .data
    );
  }
  
  static get programDir(): typeof System.ReadOnlyFile {
    return new System.ReadOnlyFile(
      System.root,
      System.config.system
        .prod
        .dirs
        .program
    );
  }
  
  static get programSource(): typeof System.ReadOnlyFile {
    const source: DirAddress = System.config.system
      .source
      .program
      .dir as DirAddress;
    return new System.ReadOnlyFile(
      new System.Bookmark(
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
  
  static get externalSecretsDir(): typeof System.ReadOnlyFile {
    const ext: DirAddress = System.config.system
      .external
      .secrets
      .dir as DirAddress;
    return new System.ReadOnlyFile(
      new System.Bookmark(
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

module.exports = System;
