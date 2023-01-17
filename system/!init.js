class Init {
  static init(
    reboot = false,
    doInitializeLibraries = false,
    doInitializeScripts = false 
  ) {
    // Bootstrap by loading system files from Repo/system (files that are core to operating Scriptable apps).
    if (reboot) {
      const Boot = importModule("!boot");
      Boot.boot();
    }
    
    // Use system files to initialize system.
    // Set arg1=true to load libraries from repo.
    // Set arg2=true to load Scripts from repo.
    const System = importModule("system/System");
    System.init(
      doInitializeLibraries,
      doInitializeScripts
    );
  }
}

Init.init(true, true, false);

module.exports = Init;
module.exports.Init = Init;
