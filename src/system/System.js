class System {
  static installLibraries() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    const here = iFm.joinPath(
      iFm.bookmarkedPath(
        "iCloud/Scriptable"
      ),
      "lib"
    );
    const destination = here;
      
    const there = lFm.joinPath(
      lFm.bookmarkedPath(
        "Repositories/Scriptable/src"
      ),
      "lib"
    );
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
      iFm.copy(source, destination);
  }
  
  static installApplications() {
  
  }
}

module.exports = System;
module.exports.System = System;
