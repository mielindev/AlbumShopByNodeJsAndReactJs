import { Op } from "sequelize";
import db from "../models";

// Tạo giỏ hàng mới
export const insertCart = async (req, res) => {
  const { user_id, session_id } = req.body;
  if ((session_id && user_id) || (!session_id && !user_id)) {
    return res.status(400).json({
      message: "Chỉ được phép một trong hai giá trị session_id hoặc user_id",
    });
  }
  if (user_id) {
    const isUserExisted = await db.User.findByPk(user_id);
    if (!isUserExisted) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
  }
  const isCartExisted = await db.Cart.findOne({
    where: {
      [Op.or]: [
        { session_id: session_id ? session_id : null },
        { user_id: user_id ? user_id : null },
      ],
    },
  });
  if (isCartExisted) {
    return res.status(409).json({
      message: "Đã tồn tại giỏ hàng với cùng session_id hoặc user_id",
    });
  }
  const cart = await db.Cart.create(req.body);
  return res.status(201).json({
    message: "Tạo giỏ hàng thành công",
    data: cart,
  });
};

// Lấy danh sách giỏ hàng
export const getAllCarts = async (req, res) => {
  const { user_id, session_id, page = 1, pageSize = 5 } = req.query;
  const parsePage = parseInt(page, 10);
  const parsePageSize = parseInt(pageSize, 10);
  const offset = (parsePage - 1) * parsePageSize;
  const whereClause = {};

  if (user_id) whereClause.user_id = user_id;
  if (session_id) whereClause.session_id = session_id;

  const [carts, totalCarts] = await Promise.all([
    db.Cart.findAll({
      where: whereClause,
      include: [
        {
          model: db.CartItem,
          as: "cart_items",
        },
      ],
      limit: parsePageSize,
      offset,
    }),
    db.Cart.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách giỏ hàng thành công",
    data: carts,
    current_page: parsePage,
    total_pages: Math.ceil(totalCarts / parsePageSize),
    totalCarts,
  });
};

// Lấy thông tin giỏ hàng bằng ID
export const getCartById = async (req, res) => {
  const { id } = req.params;
  const cart = await db.Cart.findByPk(id, {
    include: [
      {
        model: db.CartItem,
        as: "cart_items",
      },
    ],
  });
  if (!cart) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }
  return res.status(200).json({
    message: "Lấy thông tin giỏ hàng thành công",
    data: cart,
  });
};

// Cập nhật giỏ hàng
/**
export const updateCart = async (req, res) => {
  const { id } = req.params;
  const cart = await db.Cart.findByPk(id);
  if (!cart) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }

  await db.Cart.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật giỏ hàng thành công",
  });
};
*/

// Xóa giỏ hàng
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.Cart.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }
  return res.status(200).json({
    message: "Xóa giỏ hàng thành công",
  });
};
