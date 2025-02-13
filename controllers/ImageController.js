import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinaryConfig.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new Error("Không có file nào được tải lên");
  }

  return res.status(201).json({
    message: "Tải ảnh lên thành công",
    file: req.file.filename,
  });
};

export const uploadCloundinary = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file nào được upload" });
  }

  const sanitizedOriginalName = req.file.originalname
    .replace(/\s+/g, "-")
    .split(".")
    .slice(0, -1)
    .join("."); // Replace spaces with hyphens and remove the extension
  const fileName = `${Date.now()}-${sanitizedOriginalName}`; // Append timestamp

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "music_albums",
      public_id: fileName,
      use_filename: false,
      unique_filename: true,
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Lỗi khi tải ảnh lên", error });
      }
      // Respond with the image URL from Cloudinary
      res.status(201).json({
        message: "Tải ảnh lên thành công",
        imageUrl: result.secure_url,
      });
    }
  );
  uploadStream.end(req.file.buffer);
};

const extractPublicIdFromUrl = (url) => {
  // Regex to match the public ID in the URL
  const regex = /\/v\d+\/(.+)\.\w{3,4}$/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1]; // Return the public ID
  }
  throw new Error("Invalid Cloudinary URL");
};

export const deletedImage = async (req, res) => {
  const { url } = req.body;
  try {
    if (url.includes("https://res.cloudinary.com/")) {
      const publicID = extractPublicIdFromUrl(url);
      const result = await cloudinary.uploader.destroy(publicID);
      return res.status(200).json({
        message: "Ảnh đã được xoá thành công",
      });
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const filePath = path.join(__dirname, "../uploads", path.basename(url));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(200).json({
        message: "Ảnh đã được xoá thành công",
      });
    } else {
      return res.status(400).json({
        message: "URL không hợp lệ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xoá ảnh",
      error: error.message,
    });
  }
};

export const viewImages = async (req, res) => {
  const { fileName } = req.params;
  const imagePath = path.join(__dirname, "../uploads", fileName);
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    if (error) {
      return res.status(404).json({
        message: "Không tìm thấy file ảnh",
      });
    }
    res.sendFile(imagePath);
  });
};
