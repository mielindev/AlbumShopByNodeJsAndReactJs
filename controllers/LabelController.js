import { Op } from "sequelize";
import db from "../models";

// Add a new label
export const insertLabel = async (req, res) => {
  const { name } = req.body;
  const isLabelExisting = await db.Label.findOne({
    where: { name: name.trim() },
  });
  if (isLabelExisting) {
    return res.status(409).json({
      message: "Nhà sản xuất này đã tồn tại",
    });
  }
  const label = await db.Label.create(req.body);
  return res.status(201).json({
    message: "Thêm nhà sản xuất thành công",
    data: label,
  });
};

// Get the list of labels
export const getLabels = async (req, res) => {
  const { search = "", page = 1, pageSize = 5 } = req.query;
  const offset = (page - 1) * pageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  const [labels, totalLabels] = await Promise.all([
    db.Label.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Label.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách nhà sản xuất thành công",
    data: labels.map((label) => label),
    current_page: page,
    total_pages: Math.ceil(totalLabels / pageSize),
    total: totalLabels,
  });
};

// Get the details of a label
export const getLabelById = async (req, res) => {
  const { id } = req.params;
  const label = await db.Label.findByPk(id);
  if (!label) {
    return res.status(404).json({
      message: "Không tìm thấy nhà sản xuất",
    });
  }
  return res.status(200).json({
    message: "Lấy thông tin nhà sản xuất thành công",
    data: label,
  });
};

// Modify the label information
export const updateLabels = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const isLabelExisted = await db.Label.findByPk(id);
  if (!isLabelExisted) {
    return res.status(404).json({
      message: `Không tìm thấy hãng thu âm có id bằng ${id}`,
    });
  }
  if (name !== undefined) {
    const isLabelExisted = await db.Label.findOne({
      where: { name, id: { [Op.ne]: id } },
    });
    if (isLabelExisted) {
      return res.status(409).json({
        message: "Nhà sản xuất này đã tồn tại, vui lòng thử lại",
        data: isLabelExisted,
      });
    }
  }
  await db.Label.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật thông tin nhà sản xuất thành công",
  });
};

// Delete a label
export const deleteLabels = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.Label.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({
      message: "Không tìm thấy nhà sản xuất",
    });
  } else {
    return res.status(201).json({
      message: "Xoá nhà sản xuất thành công",
    });
  }
};
