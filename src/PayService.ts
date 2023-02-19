// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
namespace PayService {

  const shortcut: typeof Shortcut = importModule('system/Shortcut');

  export class PayService extends shortcut {

    runtime(input: any): string {
      return String(input) ?? "";
    }

  }

}

new PayService.PayService().run();
