const BOOT_FILE = String("./boot/Boot");
const FILE_MODULE = String(
  "core/file/File"
);

const Boot = importModule(BOOT_FILE);
const ReadOnlyFile = (importModule(FILE_MODULE)).ReadOnlyFile;
const Bookmark = (importModule(FILE_MODULE)).Bookmark;

class System {
  static get config() {
    return JSON
    .parse(
      ReadOnlyFile
      .fromFile(
        this.systemDir,
        Boot.SYSTEM_CONFIG_FILE
      )
      ?.data
    )
    ?.system ?? new Object();
  }
  
  static get root() {
    return new ReadOnlyFile(
      new Bookmark(
        Boot.ROOT_BOOKMARK
      )
    );
  }
  
  static get bootDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      Boot.BOOT_DIR
    );
  }
  
  static get systemDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      Boot.SYSTEM_DIR
    );
  }
  
  static get configDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      this
      .config
      .prod
      .dirs
      .config
    );
  }
  
  static get configSource() {
    const source = this
      .config
      .source
      .config
      .dir;
    return new ReadOnlyFile(
      new Bookmark(
        source?.bookmark ?? String()
      ),
      source?.subpath ?? String()
    );
  }
  
  static get libDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      this
      .config
      .prod
      .dirs
      .lib
    );
  }
  
  static get libSource() {
    const source = this
      .config
      .source
      .lib
      .dir;
    return new ReadOnlyFile(
      new Bookmark(
        source?.bookmark ?? String()
      ),
      source?.subpath ?? String()
    );
  }
  
  static get dataDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      this
      .config
      .prod
      .dirs
      .data
    );
  }
  
  static get programDir() {
    return ReadOnlyFile.fromFile(
      this.root,
      this
      .config
      .prod
      .dirs
      .program
    );
  }
  
  static get programSource() {
    const source = this
      .config
      .source
      .program
      .dir;
    return new ReadOnlyFile(
      new Bookmark(
        source?.bookmark ?? String()
      ),
      source?.subpath ?? String()
    );
  }
  
  static get protectedFilePrefix() {
    return String(
      this
      .config
      .prod
      .protected
      .filePrefix
    );
  }
  
  static get externalSecretsDir() {
    const ext = this
      .config
      .external
      .secrets
      .dir;
    return new ReadOnlyFile(
      new Bookmark(
        ext?.bookmark ?? String()
      ),
      ext?.subpath ?? String()
    );
  }
  
  static installConfigs() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    
    const here = this.configDir.path;
    const destination = here;
      
    const there = this.configSource.path;
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
    iFm.copy(source, destination);
  }
  
  static installLibraries() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    
    const here = this.libDir.path;
    const destination = here;
      
    const there = this.libSource.path;
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
    iFm.copy(source, destination);
  }
  
  static installPrograms() {
    const confirm = new Alert();
    confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
    confirm.addDestructiveAction("Yes, DELETE prod");
    confirm.addCancelAction("No, cancel");
    confirm.present().then((value) => (pull(this, value)));
    
    function pull(
      system,
      value = -1
    ) {
      if (value === 0) {
        const iFm = FileManager.iCloud();
        const lFm = FileManager.local();
        const here = system.programDir.path;
        const destination = here;
          
        const there = system.programSource.path;
        const source = there;
        
        const dScripts = iFm
          .listContents(
            destination
          ).filter((leaf) => (
            !leaf.startsWith(system.protectedFilePrefix)
            && !(leaf === system.libDir.leaf)
            && !(leaf === system.bootDir.leaf)
            && !(leaf === system.dataDir.leaf)
            && !(leaf === system.configDir.leaf)
            && !(leaf === system.systemDir.leaf)
            && !(leaf === ".Trash")
          ));
          
        const sScripts = lFm
          .listContents(
            source
          ).filter((leaf) => (
            !(leaf === system.libDir.leaf)
          ));
          
        for (const leaf of dScripts) {
          const dFile = iFm.joinPath(
            destination,
            leaf
          );
          console.log(dFile);
          iFm.remove(dFile);
        }
        
        for (const leaf of sScripts) {
          const sFile = iFm.joinPath(
            source,
            leaf
          );
          const dFile = iFm.joinPath(
            destination,
            leaf
          );
          console.log([sFile, dFile]);
          iFm.copy(sFile, dFile);
        } // pull.for
      } // pull
    } // if user prompt yes
  } // installApplications
} // class System

const File = importModule(FILE_MODULE);
module.exports = System;
module.exports.File = File;
module.exports.ReadOnlyFile = ReadOnlyFile;
module.exports.Bookmark = Bookmark;
module.exports.System = System;
