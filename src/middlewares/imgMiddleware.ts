import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs'
interface FileValidationError {
  message: string;
}

export const imgMiddleware = async (
  req: any,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No files were chosen.' });
    }

    const files : any = Object.values(req.files).flat() ;

    for (const file of files) {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: 'File format is incorrect. Only JPEG/PNG/WEBP are allowed.'
        });
      }

      if (file.size > 10 * 1024 * 1024) { // 10 MB limit
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: 'File size is too large. Maximum 10 MB allowed.'
        });
      }
    }

    next();
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Helper function to remove temporary file
const removeTmp = (path: string) => {
  fs.unlink(path, (error) => {
    if (error) console.error('Error removing temporary file:', error); // Log the error, but don't throw to prevent further issues
  });
};
