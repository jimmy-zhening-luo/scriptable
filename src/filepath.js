// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
// Helper class... get filepaths for bookmarks

module.exports.bookmarkedPaths = (_bookmarks = new Object) => {
  
  if (!_bookmarks) {
    throw new TypeError(`filepath.bookmarkedPaths: expected input 'bookmarks' of type Object. Instead, 'bookmarks' is null or undefined.`);
  }
  else if (_bookmarks == false) {
    throw new TypeError(`filepath.bookmarkedPaths: expexted input 'bookmarks' of type Object. Instead, 'bookmarks' evaluates to falsey.`);
  }
  
  let bookmarks = new Map;
  
  try {
    bookmarks = new Map(Object.entries(_bookmarks));
  } catch (e) {
    console.error(new TypeError(`filepath.bookmarkedPaths: expected input 'bookmarks' of type Object. Instead, 'bookmarks' is of type ${typeof bookmarks}. Value of 'bookmarks': ${bookmarks}`, { cause: e }));
  }
  
  let fm = FileManager.local();
  let dirs = new Map;
  
  try {
    dirs = new Map([...bookmarks.entries()].map(([key, value]) => [key, fm.bookmarkedPath(value)]));
  } catch (e) {
    console.error(e);
  }
  
  return dirs;
}