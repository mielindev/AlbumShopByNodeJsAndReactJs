import { Sequelize, Op } from "sequelize";
import db from "../models";

export const insertNewsArticles = async (req, res) => {
  const { title, productIds } = req.body;
  const isNewsExisted = await db.News.findOne({
    where: { title: title.trim() },
  });
  if (isNewsExisted) {
    return res.status(409).json({
      message: "Bài báo viết đã tồn tại",
    });
  }
  const transaction = await db.sequelize.transaction();
  try {
    const newsArticle = await db.News.create(req.body, { transaction });

    if (productIds && productIds.length) {
      const validProducts = await db.Product.findAll({
        where: { id: productIds },
        transaction,
      });
      const validProductIds = validProducts.map((product) => product.id);
      const filterProductIds = productIds.filter((id) =>
        validProductIds.includes(id)
      );

      const newsDetailPromises = filterProductIds.map((product_id) => {
        return db.NewsDetail.create(
          {
            product_id: product_id,
            news_id: newsArticle.id,
          },
          { transaction }
        );
      });
      await Promise.all(newsDetailPromises);
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Tạo bài viết thành công",
      data: newsArticle,
    });
  } catch (error) {
    await transaction.rollback();

    return res.status(500).json({
      message: "Không thể thêm bài viết mới",
      error: error.message,
    });
  }
};

export const getNewsArticles = async (req, res) => {
  const { search = "", page = 1, pageSize = 10 } = req.query;

  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 10);
  const offset = (parsedPage - 1) * parsedPageSize;
  const whereClause = {};

  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [newsArticles, totalNewsArticles] = await Promise.all([
    db.News.findAll({
      where: whereClause,
      limit: parsedPageSize,
      offset,
    }),
    db.News.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách bài viết thành công",
    data: newsArticles,
    current_page: parsedPage,
    total_pages: Math.ceil(totalNewsArticles / parsedPageSize),
    totalNewsArticles,
  });
};

export const getNewsById = async (req, res) => {
  const { id } = req.params;
  const news = await db.News.findByPk(id);
  if (news) {
    return res.status(200).json({
      message: "Lấy chi tiết bài viết thành công",
      data: news,
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy bài viết",
    });
  }
};

export const updateNewsArticles = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const isNewsExisting = await db.News.findByPk(id);
  if (!isNewsExisting) {
    return res.status(404).json({
      message: `Không tìm thấy bài viết có id bằng ${id}`,
    });
  }
  if (title !== undefined) {
    const isDuplicated = await db.News.findOne({
      where: { title, id: { [Op.ne]: id } },
    });
    if (isDuplicated) {
      return res.status(404).json({
        message: `Đã tồn tại bài viết với tiêu đề`,
        data: isDuplicated,
      });
    }
  }
  await db.News.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật bài viết thành công",
  });
};

export const deleteNewsArticles = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.News.destroy({ where: { id } });
  if (deleted) {
    return res.status(200).json({
      message: "Xoá bài viết thành công",
    });
  } else {
    return res.status(400).json({
      message: "Bài viết xoá không thành công",
    });
  }
};
