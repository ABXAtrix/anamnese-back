export interface IStorageProvider {
  uploadImage(file: Buffer, fileName: string): Promise<string>;
  deleteImage(blobUrl: string): Promise<void>;
}