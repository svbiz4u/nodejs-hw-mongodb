import fs from 'node:fs/promises';
import * as path from 'node:path';
import { getEnvVar } from './getEnvVar.js';

import { UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadsDir = async (file) => {
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newPath);

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};