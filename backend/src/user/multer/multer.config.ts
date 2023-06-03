import { diskStorage } from 'multer';
import { extname } from 'path';

const allowedFileTypes = ['.jpg', '.jpeg', '.png']; // Define the allowed file extensions
const maxFileSize = 5 * 1024 * 1024; // Define the maximum file size in bytes (e.g., 5MB)

export const multerConfig = {
  storage: diskStorage({
    destination: './../uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  }),
  // fileFilter: (req, file, callback) => {
  //   const ext = extname(file.originalname).toLowerCase();
  //   if (allowedFileTypes.includes(ext)) {
  //     callback(null, true);
  //   } else {
  //     const error = new Error('Only images (jpg, jpeg, png) are allowed');
  //     callback(error, null);
  //   }
  // },
  // limits: {
  //   fileSize: maxFileSize,
  // },
};