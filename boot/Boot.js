/*
This file must be manually copied from the repository into the boot dir.

When run, it loads the core system files from the repository.
*/

// v1.0.2

class Boot {
  static installSystem() {
    const iFm = FileManager.iCloud();
    const lFm = FileManager.local();
    const here = iFm.joinPath(
      iFm.bookmarkedPath(
        "!HERE"
      ),
      "system"
    );
    const destination = here;
      
    const there = lFm.bookmarkedPath(
      "!SYSTEM");
    const source = there;
    
    if (iFm.isDirectory(destination))
      iFm.remove(destination);
      
    iFm.copy(source, destination);
  }
}

module.exports = Boot;
module.exports.Boot = Boot;
