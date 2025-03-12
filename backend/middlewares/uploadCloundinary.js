import multer from "multer";

const storage = multer.memoryStorage();

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
