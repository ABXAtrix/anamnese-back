import { injectable } from "tsyringe";
import { put, del } from "@vercel/blob";
import type { IStorageProvider } from "./IStorageProvider.js";

@injectable()
export class BlobStorageProvider implements IStorageProvider {
  async uploadImage(file: Buffer, fileName: string): Promise<string> {
    const response = await put(fileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return response.url;
  }

  async deleteImage(blobUrl: string): Promise<void> {
    await del(blobUrl, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });
  }
}
