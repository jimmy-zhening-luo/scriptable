// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: cocktail;
"use strict";

namespace DrinkTracker {
  const shortcut: typeof Shortcut = importModule("system/Shortcut");
  
  export class DrinkTracker extends shortcut {
    runtime(): string {
      interface Input {
        action: string,
        [key: string]: string,
      }
      
      const input: Input = JSON.parse(this.input.plainTexts.shift()!);
      
      if (input.action === "Add") {
        return _addDrink();
      }
      else if (input.action === "Count") {
        const count: number = _countDrinks();
        return Number.isNaN(count)? "0" : count.toString();
      }
      else return "";
      
      function _addDrink(): string {
        return "cool";
      }
      
      function _countDrinks(): number {
        return 5;
      }
    }
  }
}

new DrinkTracker.DrinkTracker().run();
