// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
namespace Drinks {
  const Shortcut = importModule("./lib/Program").Shortcut;
  
  const token: string = "0DE241-DB31DB-D6C48B";
  
  interface BearSearchResults {
    "notes": Array<BearNote>
  }
  
  interface BearNote {
    creationDate: string,
    tags: Array<string>,
    title: string,
    modificationDate?: string | undefined,
    identifier: string,
    pin?: "yes" | "no" | undefined
  }
  
  class Drinks extends Shortcut {
    runtime(): number {
      const baseUrl: string = "bear://x-callback-url/search";
      
      const drinkTags: Array<string> = [
        "drink",
        "d"
      ];
      
      const notes: Array<BearNote> = new Array<BearNote>();
      
      function appendNotes(
        response: BearSearchResults
      ) {
        notes.push(...response.notes);
      }
      
      for (const tag of drinkTags) {
        const callbackUrl = new CallbackURL(baseUrl);
        u.addParameter("token", token);
        u.addParameter("tag", tag);
        u.open().then((response) => appendNotes(response));
      }
      
      return notes.length;
      
    }
  }
  
  console.log((new Drinks())["run"]());
}
