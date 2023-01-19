const Boot = importModule("./boot/Boot");
const File = importModule("corelib/file/File");
const Bookmark = File.Bookmark;

class System {
  static get config() {
    return JSON
    .parse(
      File
      .fromFile(
        this.systemDir,
        Boot.SYSTEM_CONFIG_FILE
      )
      ?.data
    )
    ?.system ?? new Object();
  }
  
  static get root() {
    return new File(
      new Bookmark(
        Boot.ROOT_BOOKMARK
      )
    );
  }
  
  static get bootDir() {
    return File.fromFile(
      this.root,
      Boot.BOOT_DIR
    );
  }
  
  static get systemDir() {
    return File.fromFile(
      this.root,
      Boot.SYSTEM_DIR
    );
  }
  
  static get configDir() {
    return File.fromFile(
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
      .config;
    return new File(
      new Bookmark(
        source.bookmark
      ),
      source.subpath
    );
  }
  
  static get libDir() {
    return File.fromFile(
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
      .lib;
    return new File(
      new Bookmark(
        source.bookmark
      ),
      source.subpath
    );
  }
  
  static get programDir() {
    return File.fromFile(
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
      .program;
    return new File(
      new Bookmark(
        source.bookmark
      ),
      source.subpath
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
    const force = false;
    if (force === true)
      pull(0);
    else {
      const confirm = new Alert();
      confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
      confirm.addDestructiveAction("Yes, DELETE prod");
      confirm.addCancelAction("No, cancel");
      confirm.present().then((value) => (pull(value)));
      
      function pull(value = -1) {
        if (value === 0) {
          const iFm = FileManager.iCloud();
          const lFm = FileManager.local();
          const here = this.root;
          const destination = here;
            
          const there = 
            lFm.bookmarkedPath(
              "Repositories/Scriptable/src"
            );
          const source = there;
          
          const dScripts = iFm
            .listContents(
              destination
            ).filter((leaf) => (
              !leaf.startsWith("!")
              && !(leaf === this.libDir.leaf)
              && !(leaf === this.bootDir.leaf)
              && !(leaf === this.systemDir.leaf)
              && !(leaf === ".Trash")
            ));
            
          const sScripts = lFm
            .listContents(
              source
            );
            
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
    } // installApplications.if(force)
  } // installApplications
  
  static backupPrograms() {
    // TBD
  }
} // class System

module.exports = System;
module.exports.File = File;
module.exports.Bookmark = Bookmark;
module.exports.System = System;
