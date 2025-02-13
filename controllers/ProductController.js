import db from "../models";
import { Op, Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
// Add a new product
export const insertProduct = async (req, res) => {
  const { name, genres = [], formats = [], ...dataProduct } = req.body;
  const { artist_id, label_id } = dataProduct;
  const isArtistExisted = await db.Artist.findOne({
    where: { id: artist_id },
  });
  if (!isArtistExisted) {
    return res.status(404).json({
      message: "Nghệ sĩ này không tồn tại",
    });
  }
  const isLabelExisted = await db.Label.findOne({
    where: { id: label_id },
  });
  if (!isLabelExisted) {
    return res.status(404).json({
      message: "Nhãn hàng này không tồn tại",
    });
  }
  const transaction = await db.sequelize.transaction();

  const isNameExisted = await db.Product.findOne({
    where: { name },
  });
  if (isNameExisted) {
    return res.status(409).json({
      message: "Album này đã tồn tại",
      data: isNameExisted,
    });
  }

  const product = await db.Product.create(
    { ...dataProduct, name },
    { transaction }
  );
  const listGenre = [];
  for (const genre of genres) {
    const isGenreExisted = await db.Genre.findOne({
      where: { id: genre },
    });
    if (!isGenreExisted) {
      return res.status(404).json({
        message: `Mã thể loại ${genre} không tìm thấy`,
      });
    }
    await db.GenreDetail.create(
      {
        genre_id: genre,
        product_id: product.id,
      },
      { transaction }
    );
    listGenre.push({
      name: isGenreExisted.name,
      description: isGenreExisted.description,
    });
  }

  const listFormat = [];
  for (const format of formats) {
    const isFormatExisted = await db.Format.findOne({
      where: { id: format.format_id },
    });

    if (!isFormatExisted) {
      return res.status(404).json({
        message: `Mã định dạng ${format.format_id} không tìm thấy`, // Format ID not found
      });
    }

    // Optionally create FormatDetail or similar logic
    await db.FormatDetail.create(
      {
        format_id: format.format_id,
        product_id: product.id,
        price: format.price, // Include price if available
        stock: format.stock, // Include stock if available
        old_price: format.old_price, // Include old price if available
      },
      { transaction }
    );

    listFormat.push({
      name: isFormatExisted.name,
      price: format.price, // Include price if available
      stock: format.stock, // Include stock if available
      old_price: format.old_price, // Include old price if available
    });
  }

  await transaction.commit();

  return res.status(201).json({
    message: "Thêm sản phẩm thành công",
    data: {
      product,
      genres: listGenre,
      formats: listFormat.map((item) => ({
        name: item.name,
        price: item.price,
        old_price: item.old_price,
        stock: item.stock,
      })),
    },
  });
};

// Get the list of products
export const getProducts = async (req, res) => {
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
  const [products, totalProducts] = await Promise.all([
    await db.Product.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    await db.Product.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    data: products.map((product) => product),
    current_page: parseInt(page),
    total_pages: Math.ceil(totalProducts / pageSize),
    total: totalProducts,
  });
};

// Get the details of a product
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findByPk(id, {
    include: [
      {
        model: db.GenreDetail,
        as: "genres",
        attributes: ["genre_id"],
        include: {
          model: db.Genre,
          as: "genre",
          attributes: ["name"],
        },
      },
      {
        model: db.FormatDetail,
        attributes: ["price", "old_price", "stock"],
        include: [
          {
            model: db.Format,
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm phù hợp",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thông tin sản phẩm thành công",
      data: product,
    });
  }
};

// Modify the product information
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name !== undefined) {
    const isDuplicated = await db.Product.findOne({
      where: { name, id: { [Sequelize.Op.ne]: id } },
    });
    if (isDuplicated) {
      return res.status(409).json({
        message: "Tên sản phẩm đã tồn tại, vui lòng sử dụng tên khác",
      });
    }
  }

  await db.Product.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật thông tin sản phẩm thành công",
  });
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const isProductExisted = await db.Product.findOne({
    where: { id },
  });
  if (!isProductExisted) {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại",
    });
  }
  await db.Product.destroy({
    where: { id },
  });
  return res.status(200).json({
    message: "Xoá sản phẩm thành công",
  });
};
