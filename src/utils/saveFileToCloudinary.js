import { v2 as cloudinary } from 'cloudinary';
import createHttpError from 'http-errors';
import { unlink } from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

const cloud_name = getEnvVar(CLOUDINARY.CLOUD_NAME);
const api_key = getEnvVar(CLOUDINARY.API_KEY);
const api_secret = getEnvVar(CLOUDINARY.API_SECRET);

cloudinary.config({
  secure: true,
  cloud_name,
  api_key,
  api_secret,
});

export const saveFileToCloudinary = async (file) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(file.path, {
      folder: 'photos',
    });
    await unlink(file.path);
    return secure_url;
  } catch (error) {
    await unlink(file.path);
    throw createHttpError(500, error.message);
  }
};