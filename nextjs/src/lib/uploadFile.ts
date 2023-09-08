import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { ApiError } from 'next/dist/server/api-utils';
import { join } from 'path';
import { env } from 'process';

export async function uploadFile(file: Blob, acceptedTypes: string[]) {
  const cvBuffer = Buffer.from(await file.arrayBuffer());

  const date = new Date();
  const uploadDir = join(process.cwd(), env.UPLOAD_DIR as string);

  try {
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
  } catch (error: any) {
    throw new ApiError(500, 'Failed to create upload directory: ' + error.message);
  }

  try {
    if (!acceptedTypes.includes(file.type)) {
      throw new ApiError(400, 'File type not accepted');
    }

    const [fileName, ...extension] = file.name.split('.');
    const saveName = `${fileName}-${date.getTime().toString().slice(0, 10)}.${extension.join('.')}`;
    const filePath = join(uploadDir, saveName);

    await writeFile(filePath, cvBuffer);

    return join(env.UPLOAD_DIR as string, saveName);
  } catch (error: any) {
    throw new ApiError(500, 'Failed to upload file: ' + error.message);
  }
}
