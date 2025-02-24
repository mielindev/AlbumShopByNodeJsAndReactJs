import db from "../models";
import jwt from "jsonwebtoken";
const JWT_SERECT_KEY = process.env.JWT_SERECT_KEY;
export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Không có token được cung cấp",
      });
    }

    const decoded = jwt.verify(token, JWT_SERECT_KEY);
    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }

    return user;
  } catch (error) {
    res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
    return null;
  }
};
