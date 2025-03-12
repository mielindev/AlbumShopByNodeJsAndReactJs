import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "../uploads");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "-");
    const newFileName = `${Date.now()}-${sanitizedOriginalName}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const isValidMimeType = allowedFileTypes.test(file.mimetype);
  const isValidExt = allowedFileTypes.test(
    file.originalname.split(".").pop().toLowerCase()
  );
  if (isValidExt && isValidMimeType) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ có thể upload file ảnh"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

export default upload;
