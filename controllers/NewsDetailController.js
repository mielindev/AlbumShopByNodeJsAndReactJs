import { Op, Sequelize } from "sequelize";
import db from "../models";

// Add a new artist
export const insertNewsDetail = async (req, res) => {
  const { news_id, product_id } = req.body;
  const isNewsExisted = await db.News.findOne({
    where: { id: news_id },
  });
  if (!isNewsExisted) {
    return res.status(404).json({
      message: "Không tìm thấy bài viết",
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
  const isDuplicated = await db.NewsDetail.findOne({
    where: { news_id, product_id },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Bài viết đã được sử dụng cho sản phẩm này",
      data: isDuplicated,
    });
  }
  const newsDetail = await db.NewsDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm mới chi tiết bài viết thành công",
    data: newsDetail,
  });
};

// Get the list of artists
export const getNewsDetails = async (req, res) => {
  const { news_id, product_id, page = 1, pageSize = 10 } = req.query;

  //   Prase and validate the pagination inputs
  const prasedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 1);
  const offset = (page - 1) * pageSize;

  const whereClause = {};
  if (news_id) whereClause.news_id = news_id;
  if (product_id) whereClause.product_id = product_id;

  const [newsDetails, totalNewsDetails] = await Promise.all([
    db.NewsDetail.findAll({
      where: whereClause,
      limit: parsedPageSize,
      offset,
    }),
    db.NewsDetail.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách chi tiết bài viết thành công",
    data: newsDetails,
    current_page: prasedPage,
    total_pages: Math.ceil(totalNewsDetails / parsedPageSize),
    totalNewsDetails,
  });
};

// Get the details of an artist
export const getNewsDetailById = async (req, res) => {
  const { id } = req.params;
  const newsDetails = await db.NewsDetail.findByPk(id);
  if (!newsDetails) {
    return res.status(200).json({
      message: "Không tìm thấy bài viết này",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thông tin bài viết thành công",
      data: newsDetails,
    });
  }
};

// Modify the artist information
export const updateNewsDetails = async (req, res) => {
  const { id } = req.params;
  const { news_id = null, product_id = null } = req.body;

  if (news_id !== null) {
    const isNewsDetailExisted = await db.Genre.findOne({
      where: { id: news_id },
    });
    if (!isNewsDetailExisted) {
      return res.status(404).json({
        message: "Không tìm thấy bài viết",
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
  const isDuplicated = await db.NewsDetail.findOne({
    where: { news_id, product_id, id: { [Op.ne]: id } },
  });
  if (isDuplicated) {
    return res.status(409).json({
      message: "Bài viết đã được sử dụng cho sản phẩm này",
      data: isDuplicated,
    });
  }
  await db.GenreDetail.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật chi tiết bài viết thành công",
  });
};

// Delete a aritst
export const deleteArtists = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.NewsDetail.destroy({
    where: { id },
  });
  if (deleted) {
    return res.status(200).json({
      message: "Chi tiết bài viết đã được xoá",
    });
  } else {
    return res.status(400).json({
      message: "Thất bại khi xoá chi tiết bài viết",
    });
  }
};
