import path from "path";
import fs from "fs";
const isImageExisted = (req, res, next) => {
  const { image } = req.body;
  if (!image.startsWith("http://") && !image.startsWith("https://")) {
    const imagePath = path.join(__dirname, "../uploads", image);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        message: "File ảnh không tồn tại",
      });
    }
  }
  next();
};
export default isImageExisted;
