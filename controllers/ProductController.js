import db from "../models";
import { Op, Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
// Add a new product
export const insertProduct = async (req, res) => {
  const { name, genres = [], formats = [], ...dataProduct } = req.body;
  const { artist, label } = dataProduct;

  const transaction = await db.sequelize.transaction();
  try {
    // Check and create artist
    let artistInstance = await db.Artist.findOne({
      where: { name: artist.trim() },
    });
    if (!artistInstance) {
      artistInstance = await db.Artist.create({ name }, { transaction });
    }
    // Check and create label
    let labelInstance = await db.Label.findOne({
      where: { name: label.trim() },
    });
    if (!labelInstance) {
      labelInstance = await db.Label.create({ name: label }, { transaction });
    }

    // Check for existing product
    const isNameExisted = await db.Product.findOne({
      where: { name },
    });
    if (isNameExisted) {
      await transaction.rollback();
      return res.status(409).json({
        message: "Sản phẩm này đã tồn tại",
        data: isNameExisted,
      });
    }

    // Create product
    const product = await db.Product.create(
      {
        ...dataProduct,
        name,
        artist_id: artistInstance.id,
        label_id: labelInstance.id,
      },
      { transaction }
    );

    const listGenre = [];
    for (const genre of genres) {
      const isGenreExisted = await db.Genre.findOne({
        where: { id: genre },
      });
      if (!isGenreExisted) {
        return res.status(404).json({
          message: "Thể loại không tồn tại",
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
          message: "Định dạng không tồn tại",
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
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
      include: [
        {
          model: db.Label,
          as: "label",
          attributes: ["name"],
        },
        {
          model: db.Artist,
          as: "artist",
          attributes: ["name"],
        },
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
          as: "format_details",
          attributes: ["price", "old_price", "stock"],
          include: [
            {
              model: db.Format,
              as: "format",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
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
        model: db.Label,
        as: "label",
        attributes: ["name"],
      },
      {
        model: db.Artist,
        as: "artist",
        attributes: ["name"],
      },
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
        as: "format_details",
        attributes: ["price", "old_price", "stock"],
        include: [
          {
            model: db.Format,
            as: "format",
            attributes: ["id", "name"],
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
  const { name, genres, formats, artist, label, ...dataProduct } = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    // Check if the product exists
    const product = await db.Product.findByPk(id, {
      include: [
        {
          model: db.Label,
          as: "label",
          attributes: ["name"],
        },
        {
          model: db.Artist,
          as: "artist",
          attributes: ["name"],
        },
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
          as: "format_details",
          attributes: ["price", "old_price", "stock"],
          include: [
            {
              model: db.Format,
              as: "format",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    if (!product) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
      });
    }

    // Prepare update data
    const updateData = { ...dataProduct };

    // Check and update name if changed
    if (name !== undefined && name !== product.name) {
      const isDuplicated = await db.Product.findOne({
        where: { name, id: { [db.Sequelize.Op.ne]: id } },
      });
      if (isDuplicated) {
        await transaction.rollback();
        return res.status(409).json({
          message: "Tên sản phẩm đã tồn tại, vui lòng sử dụng tên khác",
        });
      }
      updateData.name = name;
    }

    // Check and update artist if changed
    let artistInstance = product.artist;
    if (artist !== undefined && artist !== product.artist.name) {
      artistInstance = await db.Artist.findOne({
        where: { name: artist.trim() },
      });
      if (!artistInstance) {
        artistInstance = await db.Artist.create(
          { name: artist },
          { transaction }
        );
      }
      updateData.artist_id = artistInstance.id;
    }

    // Check and update label if changed
    let labelInstance = product.label;
    if (label !== undefined && label !== product.label.name) {
      labelInstance = await db.Label.findOne({
        where: { name: label.trim() },
      });
      if (!labelInstance) {
        labelInstance = await db.Label.create({ name: label }, { transaction });
      }
      updateData.label_id = labelInstance.id;
    }

    // Update product if there are changes
    if (Object.keys(updateData).length > 0) {
      await db.Product.update(updateData, { where: { id }, transaction });
    }

    // Handle genres if provided and changed
    let listGenre = [];
    if (genres !== undefined) {
      const currentGenreIds = product.genres.map((g) => g.id);
      const newGenreIds = genres.map((g) => g);
      const genresChanged =
        JSON.stringify(currentGenreIds.sort()) !==
        JSON.stringify(newGenreIds.sort());

      if (genresChanged) {
        await db.GenreDetail.destroy({
          where: { product_id: id },
          transaction,
        });
        for (const genre of genres) {
          const isGenreExisted = await db.Genre.findOne({
            where: { id: genre },
          });
          if (!isGenreExisted) {
            await transaction.rollback();
            return res.status(404).json({
              message: "Thể loại không tồn tại",
            });
          }
          await db.GenreDetail.create(
            {
              genre_id: genre,
              product_id: id,
            },
            { transaction }
          );
          listGenre.push({
            name: isGenreExisted.name,
            description: isGenreExisted.description,
          });
        }
      }
    }

    // Handle formats if provided and changed
    let listFormat = [];
    if (formats !== undefined) {
      const currentFormats = product.format_details.map((f) => ({
        format_id: f.format.id,
        price: f.price,
        stock: f.stock,
        old_price: f.old_price,
      }));
      const newFormats = formats.map((f) => ({
        format_id: f.format_id,
        price: f.price,
        stock: f.stock,
        old_price: f.old_price,
      }));
      const formatsChanged =
        JSON.stringify(currentFormats.sort()) !==
        JSON.stringify(newFormats.sort());

      if (formatsChanged) {
        await db.FormatDetail.destroy({
          where: { product_id: id },
          transaction,
        });
        for (const format of formats) {
          const isFormatExisted = await db.Format.findOne({
            where: { id: format.format_id },
          });
          if (!isFormatExisted) {
            await transaction.rollback();
            return res.status(404).json({
              message: "Định dạng không tồn tại",
            });
          }
          await db.FormatDetail.create(
            {
              format_id: format.format_id,
              product_id: id,
              price: format.price,
              stock: format.stock,
              old_price: format.old_price,
            },
            { transaction }
          );
          listFormat.push({
            name: isFormatExisted.name,
            price: format.price,
            stock: format.stock,
            old_price: format.old_price,
          });
        }
      }
    }

    await transaction.commit();

    // Fetch updated product
    const updatedProduct = await db.Product.findOne({
      where: { id },
      include: [
        { model: db.Artist },
        { model: db.Label },
        { model: db.Genre, through: db.GenreDetail },
        { model: db.Format, through: db.FormatDetail },
      ],
    });

    return res.status(200).json({
      message: "Cập nhật thông tin sản phẩm thành công",
      data: {
        product: updatedProduct,
        genres:
          genres !== undefined
            ? listGenre
            : updatedProduct.Genres.map((g) => ({
                name: g.name,
                description: g.description,
              })),
        formats:
          formats !== undefined
            ? listFormat
            : updatedProduct.Formats.map((f) => ({
                name: f.name,
                price: f.FormatDetail.price,
                stock: f.FormatDetail.stock,
                old_price: f.FormatDetail.old_price,
              })),
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật sản phẩm",
      error: error.message,
    });
  }
};

// Delete a product
export const lockProduct = async (req, res) => {
  const { id } = req.params;

  // Check if the product exists
  const isProductExisted = await db.Product.findOne({
    where: { id },
  });

  if (!isProductExisted) {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại",
    });
  }

  // Check if the product is already locked (optional, depending on your needs)
  if (isProductExisted.active === 0) {
    return res.status(400).json({
      message: "Sản phẩm đã bị khóa trước đó",
    });
  }

  // Update the product to lock it
  await db.Product.update(
    { active: 0 }, // Assuming 'isLocked' is the field to lock the product
    { where: { id } }
  );

  return res.status(200).json({
    message: "Khóa sản phẩm thành công",
  });
};
