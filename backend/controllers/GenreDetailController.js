import { Sequelize, Op } from "sequelize";
import db from "../models";

export const insertGenreDetail = async (req, res) => {
  const { genre_id, product_id } = req.body;
  const isGenreExisted = await db.Genre.findOne({
    where: { id: genre_id },
  });
  if (!isGenreExisted) {
    return res.status(404).json({
      message: "Không tìm thấy thể loại",
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
  const isDuplicated = await db.GenreDetail.findOne({
    where: { genre_id, product_id },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Sản phẩm này đã tồn tại thể loại này",
      data: isDuplicated,
    });
  }
  const genreDetail = await db.GenreDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm mới chi tiết thể loại thành công",
    data: genreDetail,
  });
};

export const getGenreDetails = async (req, res) => {
  const { genre_id, product_id, page = 1, pageSize = 10 } = req.query;

  //   Prase and validate the pagination inputs
  const prasedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 1);
  const offset = (page - 1) * pageSize;

  const whereClause = {};
  if (genre_id) whereClause.genre_id = genre_id;
  if (product_id) whereClause.product_id = product_id;

  const [genreDetails, totalGenreDetails] = await Promise.all([
    db.GenreDetail.findAll({
      where: whereClause,
      limit: parsedPageSize,
      offset,
    }),
    db.GenreDetail.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách chi tiết thể loại thành công",
    data: genreDetails,
    current_page: prasedPage,
    total_pages: Math.ceil(totalGenreDetails / parsedPageSize),
    total: totalGenreDetails,
  });
};

export const getGenreDetailById = async (req, res) => {
  const { id } = req.params;
  const genreDetail = await db.GenreDetail.findByPk(id);
  if (!genreDetail) {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết thể loại",
    });
  }
  return res.status(200).json({
    message: "Lấy chi tiết thể loại thành công",
    data: genreDetail,
  });
};

export const updateGenreDetail = async (req, res) => {
  const { id } = req.params;
  const { genre_id = null, product_id = null } = req.body;

  if (genre_id !== null) {
    const isGenreExisted = await db.Genre.findOne({
      where: { id: genre_id },
    });
    if (!isGenreExisted) {
      return res.status(404).json({
        message: "Không tìm thấy thể loại",
      });
    }
  }
  if (product_id !== null) {
    const isProductExisted = await db.Product.findOne({
      where: { id: product_id },
    });
    if (!isProductExisted) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
  }
  const isDuplicated = await db.GenreDetail.findOne({
    where: { genre_id, product_id, id: { [Op.ne]: id } },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Sản phẩm này đã tồn tại thể loại này",
      data: isDuplicated,
    });
  }
  await db.GenreDetail.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật chi tiết thể loại thành công",
  });
};

export const deleteGenreDetail = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.GenreDetail.destroy({
    where: { id },
  });
  if (deleted) {
    return res.status(200).json({
      message: "Xoá thành công chi tiết thể loại",
    });
  } else {
    return res.status(400).json({
      message: "Thất bại khi xoá chi tiết thể loại",
    });
  }
};
