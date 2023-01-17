/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

class Loader {
  static bootstrap() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    const here = iFm.joinPath(
      iFm.bookmarkedPath(
        "iCloud/Scriptable"
      ),
      "system"
    );
    const destination = here;
      
    const there = lFm.joinPath(
      lFm.bookmarkedPath(
        "Repositories/Scriptable"
      ),
      "system"
    );
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
    iFm.copy(source, destination);
  }
}

module.exports = Loader;
module.exports.Loader = Loader;