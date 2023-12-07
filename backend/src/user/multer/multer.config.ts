
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

const allowedFileTypes = ['.jpg', '.jpeg', '.png']; // Define the allowed file extensions
const maxFileSize = 4 * 1024 * 1024; // Define the maximum file size in bytes (e.g., 5MB)

export const multerConfig = {
  // this destination will works only inside the container
  // storage: diskStorage({
  //   destination: 'images_uploads',
  //   filename: (req, file, callback) => {
  //     const uniqueSuffix = Date.now();
  //     const extension = extname(file.originalname);
  //     callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  //   },
  // }),
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      callback(null, true);
    } 
    else 
      callback(new BadRequestException('Only images (jpg, jpeg, png) are allowed'), false);
  },
  limits: {
    fileSize: maxFileSize,
  },
};