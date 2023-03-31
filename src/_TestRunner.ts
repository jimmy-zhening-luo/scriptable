// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
"use strict";
const SUPPRESS_LOGGING = false;

namespace TestRunner {
  
  const Scriptable: typeof Scriptable = importModule("system/Scriptable");
  
  export class TestRunner extends Scriptable {
    private readonly _suites: TestSuite[] = [
      [
       []
      
      ]
    ].map(suite => new TestSuite(suite))
    
    runtime(): string {
      try {
        return this._suites.reduce(suite => suite.execute());
      } catch (e) {
        
      }
    }
  }
  
  export class TestSuite {
    private readonly _name: string = "";
    private readonly _cases: TestCase[];
    
    constructor(caseTuples: string[][]) {
      try {
        this._cases = caseTuples.map(caseTuple => new TestCase(caseTuple));
      } catch (e) {
        
      }
    }
    
    execute(): string {
      try {
        return `${this._name}: ${this._cases.reduce(case => case.execute())}\n`;
      } catch (e) {
        
      }
    }
  }
  
  export class TestCase {
    private readonly _description: string;
    private readonly _left: any;
    private readonly _right: any;
    
    constructor(description: string, caseTuple: string[]) {
      try {
        this._description = description;
        this._left = caseTuple.shift();
        this._right = caseTuple.shift();
      } catch (e) {

      }
    }
    
    execute(): string {
      try {
        return `${this._description}: ${this._left === this._right ? "success" : "FAIL"}\n`;
      } catch (e) {
        
      }
    }
  }
  
}

new TestRunner.TestRunner().run();
