const fm: FileManager = FileManager.iCloud();

console.log(fm?.bookmarkedPath("Yes") ?? String());

export {}