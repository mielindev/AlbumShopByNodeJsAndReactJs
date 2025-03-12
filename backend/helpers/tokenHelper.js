import db from "../models";
import jwt from "jsonwebtoken";
const JWT_SERECT_KEY = process.env.JWT_SERECT_KEY;
export const getUserByToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Không có token được cung cấp");
  }

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SERECT_KEY);
  const user = await db.User.findByPk(decoded.id);

  if (!user) {
    throw new Error("Người dùng không tồn tại");
  }

  if (
    user.password_changed_at &&
    decoded.iat < new Date(user.password_changed_at).getTime() / 1000
  ) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  return user;
};
