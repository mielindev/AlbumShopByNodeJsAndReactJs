import { Sequelize, Op } from "sequelize";
import db from "../models";

export const insertPromotionDetail = async (req, res) => {
  const { promotion_id, product_id } = req.body;

  // Validate if promotion_id exists in the Promotion table
  const promotionExists = await db.Promotion.findByPk(promotion_id);
  if (!promotionExists) {
    return res.status(404).json({
      message: "Không tìm thấy chương trình khuyến mãi",
    });
  }

  // Validate if product_id exists in the Product table
  const productExists = await db.Product.findByPk(product_id);
  if (!productExists) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  // Create a new Promotion Detail
  const promotionDetail = await db.PromotionDetail.create({
    promotion_id,
    product_id,
  });

  return res.status(201).json({
    message: "Chương trình khuyến mãi đã được thêm thành công",
    data: promotionDetail,
  });
};

export const getPromotionDetails = async (req, res) => {
  const { promotion_id = "", page = 1, pageSize = 10 } = req.query;

  // Validate and sanitize inputs
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 10);

  const offset = (parsedPage - 1) * parsedPageSize;

  const whereClause = {};
  if (promotion_id !== "") {
    const parsedPromotionId = parseInt(promotion_id, 10);
    if (isNaN(parsedPromotionId)) {
      return res.status(400).json({ message: "Invalid promotion_id format" });
    }
    whereClause.promotion_id = { [Op.eq]: parsedPromotionId };
  }

  // Fetch data and count simultaneously
  const [promotionDetails, totalPromotionDetails] = await Promise.all([
    db.PromotionDetail.findAll({
      where: whereClause,
      limit: parsedPageSize,
      offset,
    }),
    db.PromotionDetail.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách chi tiết khuyến mãi thành công",
    data: promotionDetails,
    current_page: parsedPage,
    total_pages: Math.ceil(totalPromotionDetails / parsedPageSize),
    total: totalPromotionDetails,
  });
};

export const getPromotionDetailById = async (req, res) => {
  const { id } = req.params;
  const isPromotionDetailExisted = await db.PromotionDetail.findByPk(id);
  if (isPromotionDetailExisted) {
    return res.status(200).json({
      message: "Lấy chi tiết khuyến mãi thành công",
      data: isPromotionDetailExisted,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết khuyến mãi",
    });
  }
};
