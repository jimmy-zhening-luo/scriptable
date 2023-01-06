// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-gray;
// icon-glyph: magic;
// import helper Scriptable modules
const filepath = importModule("filepath");

const bookmarks = {
  local: "iCloud/Scriptable",
  repo: "Repositories/Scriptable"
};

let dirs = new Map;

// For each bookmark, get real file path
try {
  dirs = filepath.bookmarkedPaths(bookmarks);
  
  if (!dirs) {
    throw new ReferenceError(`repo.push: 'dirs' is undefined, because filepath.bookmarkedPaths either did not return an object or returned 'undefined'.`);
  }
  else if (dirs == false) {
    throw new ReferenceError(`repo.push: 'dirs' evaluates to false, meaning filepath.bookmarkedPaths returned an object, but it was a falsey object.`);
  }
  
} catch (e) {
  console.error(e);
}

const subpathSrc = "src";

try {
  const fm = FileManager.local();
  const pathRepoSrc = fm.joinPath(dirs.get("repo"), subpathSrc);
  
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
    repo: "https://jimmy-zhening-luo@github.com/jimmy-zhening-luo/iOS-scriptable-ecosystem.git",
    path: subpathSrc
  };
  
  Object.entries(nextParams).map(([key, value]) => next.addParameter(key, value));
  
  console.log(next.getURL());
  
  next.open();
  Script.complete();

} catch (e) {
  console.error(e);
}