import { Op } from "sequelize";
import db from "../models";

export const insertFeedback = async (req, res) => {
  const { user_id, product_id } = req.body;
  const isUserExisted = await db.User.findOne({
    where: { id: user_id },
  });
  if (!isUserExisted) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
    });
  }
  const isProductExisted = await db.Product.findOne({
    where: { id: product_id },
  });
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại",
    });
  }
  const feedback = await db.Feedback.create(req.body);
  return res.status(201).json({
    message: "Thêm mới phản hồi thành công",
    data: feedback,
  });
};

export const getFeedbacks = async (req, res) => {
  const { search = "", page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  let whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ comment: { [Op.like]: `%${search}%` } }],
    };
  }
  const [feedbacks, totalFeedbacks] = await Promise.all([
    db.Feedback.findAll({
      where: whereClause,
      include: [
        { model: db.User, attributes: ["id", "name", "avatar"] },
        {
          model: db.Product,
          attributes: ["id", "name"],
          include: { model: db.Artist, attributes: ["name"] },
        },
      ],
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Feedback.count({ where: whereClause }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách phản hồi thành công",
    data: feedbacks,
    current_page: parseInt(page),
    total_pages: Math.ceil(totalFeedbacks / pageSize),
    total: totalFeedbacks,
  });
};

export const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  const feedback = await db.Feedback.findOne({
    where: { id },
    include: [
      { model: db.User, attributes: ["id", "name", "avatar"] },
      {
        model: db.Product,
        attributes: ["id", "name"],
        include: { model: db.Artist, attributes: ["name"] },
      },
    ],
  });

  if (feedback) {
    return res.status(200).json({
      message: "Lấy thông tin phản hồi thành công",
      data: feedback,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy phản hồi",
    });
  }
};

export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { user_id, product_id } = req.body;
  const isUserExisted = await db.User.findOne({
    where: { id: user_id },
  });
  if (!isUserExisted) {
    return res.status(404).json({
      message: "Người dùng không tồn tại",
    });
  }
  const isProductExisted = await db.Product.findOne({
    where: { id: product_id },
  });
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại",
    });
  }
  await db.Feedback.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật phản hồi thành công",
  });
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  const deleted = await db.Feedback.destroy({
    where: { id },
  });

  if (deleted) {
    return res.status(200).json({
      message: "Xóa phản hồi thành công",
    });
  } else {
    return res.status(404).json({
      message: "Phản hồi không tồn tại",
    });
  }
};
