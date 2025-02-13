import { Sequelize, Op } from "sequelize";
import db from "../models";

export const insertPromotion = async (req, res) => {
  const { name } = req.body;
  const isPromotionExisted = await db.Promotion.findOne({
    where: { name },
  });
  if (isPromotionExisted) {
    return res.status(409).json({
      message: "Chương trình khuyến mãi này đã tồn tại",
    });
  }
  const promotion = await db.Promotion.create(req.body);
  return res.status(201).json({
    message: "Thêm chương trình khuyến mãi thành công",
    data: promotion,
  });
};

export const getPromotions = async (req, res) => {
  const { search = "", page = 1, pageSize = 10 } = req.query;
  const parsePage = parseInt(page, 10);
  const parsePageSize = parseInt(pageSize, 10);
  const offset = (parsePage - 1) * parsePageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }
  const [promotions, totalPromotions] = await Promise.all([
    db.Promotion.findAll({
      where: whereClause,
      limit: parsePageSize,
      offset,
    }),
    db.Promotion.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách chương trình thành công",
    data: promotions,
    current_page: parsePage,
    total_pages: Math.ceil(totalPromotions / parsePageSize),
    totalPromotions,
  });
};

export const getPromotionById = async (req, res) => {
  const { id } = req.params;
  const isPromotionExisted = await db.Promotion.findOne({ where: { id } });
  if (!isPromotionExisted) {
    return res.status(404).json({
      message: "Không tìm thấy chương trình khuyến mãi",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thông tin chương trình khuyến mãi thành công",
      data: isPromotionExisted,
    });
  }
};

export const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { name = "" } = req.body;
  const isPromotionExisted = await db.Promotion.findOne({
    where: { name, id: { [Op.ne]: id } },
  });
  if (isPromotionExisted) {
    return res.status(409).json({
      message: "Chương trình khuyến mãi này đã tồn tại",
    });
  }
  const updatedPromtion = await db.Promotion.update(req.body, {
    where: { id },
  });
  if (updatedPromtion > 0) {
    return res.status(200).json({
      message: "Cập nhật chương trình khuyến mãi thành công",
    });
  }
};

export const deletePromotion = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.Promotion.destroy({
    where: { id },
  });
  if (deleted) {
    return res.status(200).json({
      message: "Xoá chương trình khuyến mãi thành công",
    });
  } else {
    return res.status(400).json({
      message: "Xoá chương trình khuyến mãi thất bại",
    });
  }
};
