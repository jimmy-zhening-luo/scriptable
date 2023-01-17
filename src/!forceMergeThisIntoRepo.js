// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
const bookmarks = {
  local: "iCloud/Scriptable",
  repo: "Repositories/Scriptable/src"
};

let dirs = new Map();

// For each bookmark, get real file path
try {
  const fm = FileManager.local();
  
  dirs = new Map(Object.entries(bookmarks).map(([key, value]) => [key, fm.bookmarkedPath(value)]));
  
} catch (e) {
  console.error(e);
}

try {
  const fm = FileManager.local();
  const pathRepoSrc = dirs.get("repo");
  
  if (fm.isDirectory(pathRepoSrc)) {
    fm.remove(pathRepoSrc);
  }
  
  fm.copy(dirs.get("local"), pathRepoSrc);
  
} catch (e) {
  console.error(e);
}

try {
  let next = new CallbackURL("working-copy://open");
  
  const nextParams = {
    repo: "https://jimmy-zhening-luo@github.com/jimmy-zhening-luo/iOS-scriptable-ecosystem.git"
  };
  
  Object.entries(nextParams).map(([key, value]) => next.addParameter(key, value));
  
  console.log(next.getURL());
  
  next.open();
  Script.complete();

} catch (e) {
  console.error(e);
}