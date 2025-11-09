export interface Spec {
  toJSON: () => object;
  toSpecContent: () => string;
  folderPath: () => string;
  specFilePath: () => string;
}
