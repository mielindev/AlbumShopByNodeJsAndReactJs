import { Op } from "sequelize";
import db from "../models";
import argon2 from "argon2";
import UserResponse from "../dtos/responses/user/UserResponse.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getImageUrl } from "../helpers/imageHelper.js";
dotenv.config();

export const register = async (req, res) => {
  const { password, username } = req.body;

  const isDuplicated = await db.User.findOne({
    where: { username },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Tên đăng nhập đã tồn tại",
    });
  }
  const hashedPassword = await argon2.hash(password);
  const user = await db.User.create({
    ...req.body,
    password: hashedPassword,
  });
  if (user) {
    return res.status(201).json({
      message: "Thêm mới người dùng thành công",
      data: new UserResponse(user),
    });
  } else {
    return res.status(500).json({
      message: "Xảy ra lỗi khi thêm người dùng",
    });
  }
};

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(404).json({
      message: "Tài khoản hoặc mật khẩu không chính xác",
    });
  }

  const passwordValid =
    password && (await argon2.verify(user.password, password));

  if (!passwordValid) {
    return res.status(401).json({
      message: "Tài khoản hoặc mật khẩu không chính xác",
    });
  }

  if (user.is_locked) {
    return res.status(423).json({
      message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ để được hỗ trợ.",
    });
  }

  const token = jwt.sign(
    { id: user.id, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SERECT_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  return res.status(200).json({
    message: "Đăng nhập thành công",
    data: {
      user: { ...user.get({ plain: true }), accessToken: token },
    },
  });
};

export const getUsers = async (req, res) => {
  const { search = "", page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [users, totalusers] = await Promise.all([
    await db.User.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    await db.User.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách người dùng thành công",
    data: users.map((user) => new UserResponse(user)),
    current_page: parseInt(page),
    total_pages: Math.ceil(totalusers / pageSize),
    total: totalusers,
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await db.User.findOne({
    where: { id },
  });
  if (user) {
    return res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      data: { ...user.get({ plain: true }), avtart: getImageUrl(user.avatar) },
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy người dùng",
    });
  }
};

export const lockUser = async (req, res) => {
  const { id } = req.params;
  const [updated] = await db.User.update(
    { is_locked: 1 },
    {
      where: { id },
    }
  );
  if (updated > 0) {
    return res.status(200).json({
      message: "Khoá người dùng thành công",
    });
  } else {
    return res.status(500).json({
      message: "Khoá người dùng thất bại",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, old_password, new_password, avatar, address, role, is_locked } =
    req.body;

  // Nếu id của JWT khác id được sửa hoặc không phải ADMIN thì chặn
  if (req.user.id !== id && req.user.role !== 2) {
    return res.status(403).json({
      message: "Không có quyền thay đổi thông tin người dùng này",
    });
  }

  const user = await db.User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
    });
  }

  // Chỉ ADMIN mới có thể cập nhật role và is_locked
  if (req.user.role === 2) {
    user.role = role;
    user.is_locked = is_locked;
  }

  // Chỉ người dùng mới có thể đổi mật khẩu - ADMIN không thể đổi mật khẩu của người dùng
  if (req.user.id === id) {
    if (new_password && old_password) {
      const passwordValid = await argon2.verify(user.password, old_password);
      if (!passwordValid) {
        return res.status(401).json({
          message: "Mật khẩu cũ không chính xác",
        });
      }
      user.password = await argon2.hash(new_password);
      user.password_changed_at = new Date();
    } else if (new_password || old_password) {
      return res.status(400).json({
        message:
          "Cần cung cấp mật khẩu cũ và mật khẩu mới để cập nhật mật khẩu",
      });
    }
    user.name = name || user.name;
    user.address = address || user.address;
    user.avatar = avatar || user.avatar;
  }

  await user.save();

  return res.status(200).json({
    message: "Cập nhật thông tin người dùng thành công",
    data: new UserResponse(user),
  });
};
