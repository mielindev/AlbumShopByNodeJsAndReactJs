import { Op } from "sequelize";
import db from "../models";

// Add a new format
export const insertFormat = async (req, res) => {
  const { name } = req.body;
  const isFormatExisting = await db.Format.findOne({
    where: { name },
  });
  if (isFormatExisting) {
    return res.status(409).json({
      message: "Định dạng này đã tồn tại",
    });
  }
  const format = await db.Format.create(req.body);
  return res.status(201).json({
    message: "Thêm định dạng thành công",
    data: format,
  });
};

// Get the list of formats
export const getFormats = async (req, res) => {
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

  const [formats, totalFormats] = await Promise.all([
    db.Format.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Format.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách định dạng thành công",
    data: formats,
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalFormats / pageSize),
    total: totalFormats,
  });
};

// Get the details of a format
export const getFormatById = async (req, res) => {
  const { id } = req.params;
  const isFormatExisting = await db.Format.findOne({
    where: { id },
  });
  if (!isFormatExisting) {
    return res.status(200).json({
      message: "Không tìm thấy định dạng này",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thông tin định dạng thành công",
      data: isFormatExisting,
    });
  }
};

// Modify the format information
export const updateFormat = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name !== undefined) {
    const isFormatExisted = await db.Format.findOne({
      where: { name: name.trim(), id: { [Op.ne]: id } },
    });
    if (isFormatExisted) {
      return res.status(409).json({
        message: "Tên định dạng này đã tồn tại, vui lòng thử lại",
      });
    }
  }
  const updateFormat = await db.Format.update(req.body, {
    where: { id },
  });
  if (updateFormat[0] > 0) {
    return res.status(200).json({
      message: "Cập nhật định dạng thành công",
    });
  }
};

// Delete a format
export const deleteFormat = async (req, res) => {
  const { id } = req.params;
  await db.Format.destroy({
    where: { id },
  });
  return res.status(201).json({
    message: "Xoá định dạng thành công",
  });
};
