// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

namespace TestRunner {

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  interface TestCase {
    evaluate: any,
    result: any
  }
  
  interface TestSuite {
    id: string,
    cases: TestCase[]
  }
  
  const shortcut: typeof Shortcut = importModule("system/Shortcut");
}