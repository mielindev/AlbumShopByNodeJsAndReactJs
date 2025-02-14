import { Op } from "sequelize";
import db from "../models";

// Thêm sản phẩm vào giỏ hàng
export const insertCartItem = async (req, res) => {
  const { cart_id, product_id, quantity, format_id } = req.body;

  const cart = await db.Cart.findByPk(cart_id);
  if (!cart) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }

  const product = await db.Product.findByPk(product_id);
  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  const productInStock = await db.FormatDetail.findOne({
    where: { product_id, format_id },
  });

  if (productInStock) {
    if (quantity > productInStock.stock) {
      return res.status(400).json({
        message: "Sản phẩm trong kho không đủ",
      });
    }
  } else {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại định dạng này",
    });
  }

  const isExistingCartItem = await db.CartItem.findOne({
    where: {
      cart_id,
      product_id,
      format_id,
    },
  });

  let discountPercent = 0;
  const isProductDiscount = await db.PromotionDetail.findOne({
    where: { product_id },
  });
  if (isProductDiscount) {
    const promotion = await db.Promotion.findByPk(
      isProductDiscount.promotion_id
    );
    discountPercent = promotion.percent;
  }

  if (isExistingCartItem) {
    if (quantity === 0) {
      await isExistingCartItem.destroy();
      return res.status(200).json({
        message: "Xoá thành công danh mục trong giỏ hàng",
      });
    } else {
      isExistingCartItem.quantity = quantity;
      isExistingCartItem.total_price =
        quantity *
        (productInStock.price - productInStock.price * (discountPercent / 100));
      await isExistingCartItem.save();
      return res.status(200).json({
        message: "Cập nhật thành công danh mục trong giỏ hàng",
        data: isExistingCartItem,
      });
    }
  } else {
    if (quantity > 0) {
      const cartItem = await db.CartItem.create({
        cart_id,
        product_id,
        quantity,
        format_id,
        total_price:
          quantity *
          (productInStock.price -
            productInStock.price * (discountPercent / 100)),
      });
      return res.status(201).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: cartItem,
      });
    }
  }
  return res.status(400).json({
    message: "Không thể thêm sản phẩm với số lượng bằng 0",
  });
};

// Lấy danh sách sản phẩm trong giỏ hàng
export const getCartItems = async (req, res) => {
  const { cart_id, page = 1, pageSize = 5 } = req.params;
  const parsePage = parseInt(page, 10);
  const parsePageSize = parseInt(pageSize, 10);
  const offset = (parsePage - 1) * parsePageSize;
  const whereClause = {};

  if (cart_id) whereClause.cart_id = cart_id;
  const [cartItems, totalCartItems] = await Promise.all([
    db.CartItem.findAll({
      where: whereClause,
      limit: parsePageSize,
      offset,
    }),
    db.CartItem.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    data: cartItems,
    current_page: parsePage,
    total_pages: Math.ceil(totalCartItems / parsePageSize),
    totalCartItems,
  });
};

export const getCartItemByCartId = async (req, res) => {
  const { cart_id } = req.params;
  const isCartExisted = await db.Cart.findOne({
    where: { id: cart_id },
  });
  if (!isCartExisted) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
      data: cartItems,
    });
  }
  const cartItems = await db.CartItem.findAll({
    where: { cart_id },
  });

  return res.status(200).json({
    message: "Lấy thành công sản phẩm trong giỏ hàng",
    data: cartItems,
  });
};

// Cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { cart_id, product_id } = req.body;

  const cartItem = await db.CartItem.findByPk(id);
  if (!cartItem) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm trong giỏ hàng",
    });
  }

  const isCartExisted = await db.Cart.findByPk(cart_id);
  if (!isCartExisted) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }
  const isProductExisted = await db.Product.findByPk(product_id);
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  await db.CartItem.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật sản phẩm thành công",
  });
};

// Xóa sản phẩm khỏi giỏ hàng
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.CartItem.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm trong giỏ hàng",
    });
  }
  return res.status(200).json({
    message: "Xóa sản phẩm khỏi giỏ hàng thành công",
  });
};
