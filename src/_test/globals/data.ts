export class Data {
  public static fromString(string: string): Data {
    console.log(`Mock Data.fromString(${string})`);

    return new Data();
  }

  public static fromFile(filePath: string): Data {
    console.log(`Mock Data.fromFile(${filePath})`);

    return new Data();
  }

  public static fromBase64String(base64String: string): Data {
    console.log(`Mock Data.fromBase64String(${base64String})`);

    return new Data();
  }

  public static fromJPEG(image: Image): Data {
    console.log(`Mock Data.fromJPEG(image: size: ${image.size.width}x${image.size.height})`);

    return new Data();
  }

  public static fromPNG(image: Image): Data {
    console.log(`Mock Data.fromPNG(image: size: ${image.size.width}x${image.size.height})`);

    return new Data();
  }

  public static fromBytes(bytes: readonly number[]): Data {
    console.log(`Mock Data.fromBytes(${bytes})`);

    return new Data();
  }

  public toRawString(): string {
    const MOCK_DATA_STRING = "MOCK_DATA_STRING";

    console.log(`Mock Data.toRawString(): ${MOCK_DATA_STRING}`);

    return MOCK_DATA_STRING;
  }

  public toBase64String(): string {
    const MOCK_DATA_BASE64 = "MOCK_DATA_BASE64";

    console.log(`Mock Data.toBase64String(): ${MOCK_DATA_BASE64}`);

    return MOCK_DATA_BASE64;
  }

  public getBytes(): number[] {
    const MOCK_DATA_BYTES = [1, 2];

    console.log(`Mock Data.getBytes(): ${MOCK_DATA_BYTES}`);

    return MOCK_DATA_BYTES;
  }
}
