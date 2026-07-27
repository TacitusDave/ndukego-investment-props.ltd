import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, writeFile, readFile, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { createChecksum } from '@nhgp/lib';

export interface StoredFile {
  storagePath: string;
  checksum: string;
  fileSize: number;
}

@Injectable()
export class StorageService {
  private readonly basePath: string;
  private readonly provider: string;

  constructor(private readonly config: ConfigService) {
    this.provider = this.config.get('STORAGE_PROVIDER') || 'local';
    this.basePath = this.config.get('STORAGE_LOCAL_PATH') || './storage/documents';
  }

  async store(relativePath: string, buffer: Buffer): Promise<StoredFile> {
    if (this.provider === 'local') {
      return this.storeLocal(relativePath, buffer);
    }
    throw new Error(`Storage provider '${this.provider}' not yet configured`);
  }

  async read(storagePath: string): Promise<Buffer> {
    if (this.provider === 'local') {
      const fullPath = join(this.basePath, storagePath);
      return readFile(fullPath);
    }
    throw new Error(`Storage provider '${this.provider}' not yet configured`);
  }

  async delete(storagePath: string): Promise<void> {
    if (this.provider === 'local') {
      const fullPath = join(this.basePath, storagePath);
      await unlink(fullPath).catch(() => undefined);
    }
  }

  private async storeLocal(relativePath: string, buffer: Buffer): Promise<StoredFile> {
    const fullPath = join(this.basePath, relativePath);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, buffer);
    const checksum = await createChecksum(buffer);
    return { storagePath: relativePath, checksum, fileSize: buffer.length };
  }
}
