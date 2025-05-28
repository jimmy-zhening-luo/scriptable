import { Size } from "./size";

export class Image {
  public size = new Size(0, 0);

  public static fromData(data: Data) {
    console.log(`Mock Image.fromData(${data.toRawString()})`);

    return new Image();
  }

  public static fromFile(filePath: string) {
    console.log(`Mock Image.fromFile(${filePath})`);

    return new Image();
  }
}
