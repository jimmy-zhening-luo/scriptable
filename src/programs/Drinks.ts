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
      
      const taggedNotes: Array<BearNote> = new Array<BearNote>();
      
      function appendNotes(
        taggedNotes: Array<BearNote>,
        response: BearSearchResults
      ) {
        const theseNotes = response.notes as Array<BearNote>;
        
        taggedNotes.push(...theseNotes);
      }
      
      for (const tag of drinkTags) {
        const u: CallbackURL = new CallbackURL(baseUrl);
        u.addParameter("token", token);
        u.addParameter("tag", tag);
        u.open().then((value) => (value.json())).then((response: BearSearchResults) => (appendNotes(taggedNotes, response)));
      }
      
      return taggedNotes.length;
      
    }
  }
  
  console.log((new Drinks())["run"]());
}
