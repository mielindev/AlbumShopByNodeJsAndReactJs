import { getUserByToken } from "../helpers/tokenHelper";

export const requireRoles = (role) => async (req, res, next) => {
  const user = await getUserByToken(req, res);
  if (!user) return;

  if (user.is_locked === 1) {
    return res.status(423).json({
      message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ để được hỗ trợ.",
    });
  }

  if (!role.includes(user.role)) {
    return res.status(423).json({
      message: "Người dùng không được phép truy cập tài nguyên.",
    });
  }
  req.user = user;
  next();
};
