import { Sequelize, Op } from "sequelize";
import db from "../models";

export const insertFormatDetail = async (req, res) => {
  const { format_id, product_id } = req.body;
  const isFormatExisted = await db.Format.findOne({
    where: { id: format_id },
  });
  if (!isFormatExisted) {
    return res.status(404).json({
      message: "Không tìm thấy định dạng",
    });
  }
  const isProductExisted = await db.Product.findOne({
    where: { id: product_id },
  });
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
  const isDuplicated = await db.FormatDetail.findOne({
    where: { format_id, product_id },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Sản phẩm này đã tồn tại định dạng này",
      data: isDuplicated,
    });
  }
  const formatDetail = await db.FormatDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm mới chi tiết định dạng thành công",
    data: formatDetail,
  });
};

export const getFormatDetails = async (req, res) => {
  const {
    format_id = "",
    product_id = "",
    page = 1,
    pageSize = 10,
  } = req.query;

  // Parse and validate pagination inputs
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 10);
  const offset = (parsedPage - 1) * parsedPageSize;

  // Construct where clause dynamically
  const whereClause = {};
  if (format_id) whereClause.format_id = format_id;
  if (product_id) whereClause.product_id = product_id;

  // Fetch data and total count concurrently
  const [formatDetails, totalFormatDetails] = await Promise.all([
    db.FormatDetail.findAll({
      where: whereClause,
      limit: parsedPageSize,
      offset,
    }),
    db.FormatDetail.count({ where: whereClause }),
  ]);

  // Respond with the results
  return res.status(200).json({
    message: "Lấy danh sách chi tiết định dạng thành công",
    data: formatDetails,
    current_page: parsedPage,
    total_pages: Math.ceil(totalFormatDetails / parsedPageSize),
    total: totalFormatDetails,
  });
};

export const getFormatDetailById = async (req, res) => {
  const { id } = req.params;
  const formatDetail = await db.FormatDetail.findByPk(id);
  if (formatDetail) {
    return res.status(200).json({
      message: "Lấy chi tiết định dạng thành công",
      data: formatDetail,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết định dạng",
    });
  }
};

export const updateFormatDetail = async (req, res) => {
  const { id } = req.params;
  const { format_id, product_id } = req.body;
  const isFormatExisted = await db.Format.findOne({
    where: { id: format_id },
  });
  if (!isFormatExisted) {
    return res.status(404).json({
      message: "Không tìm thấy định dạng",
    });
  }
  const isProductExisted = await db.Product.findOne({
    where: { id: product_id },
  });
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }
  const isDuplicated = await db.FormatDetail.findOne({
    where: { format_id, product_id, id: { [Op.ne]: id } },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Sản phẩm này đã tồn tại định dạng này",
      data: isDuplicated,
    });
  }
  await db.FormatDetail.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật chi tiết định dạng thành công",
  });
};

export const deleteFormatDetail = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.FormatDetail.destroy({ where: { id } });
  if (deleted) {
    return res.status(200).json({
      message: "Xoá chi tiết định dạng thành công",
    });
  } else {
    return res.status(400).json({
      message: "Xảy ra lỗi khi xoá chi tiết định dạng",
    });
  }
};
