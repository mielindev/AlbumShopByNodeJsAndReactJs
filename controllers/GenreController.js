import { Op, Sequelize } from "sequelize";
import db from "../models";

// Add a new genre
export const insertGenre = async (req, res) => {
  const { name } = req.body;
  const isGenreExisting = await db.Genre.findOne({
    where: { name },
  });
  if (isGenreExisting) {
    return res.status(409).json({
      message: "Thể loại này đã tồn tại",
    });
  }
  const genre = await db.Genre.create(req.body);
  return res.status(201).json({
    message: "Thêm thể loại thành công",
    data: genre,
  });
};

// Get the list of genres
export const getGenres = async (req, res) => {
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

  const [genres, totalGenres] = await Promise.all([
    db.Genre.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Genre.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách thể loại thành công",
    data: genres.map((genre) => {
      return genre;
    }),
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalGenres / pageSize),
    total: totalGenres,
  });
};

// Get the details of a genre
export const getGenreById = async (req, res) => {
  const { id } = req.params;
  const isGenreExisting = await db.Genre.findOne({
    where: { id },
  });
  if (!isGenreExisting) {
    return res.status(200).json({
      message: "Không tìm thấy thể loại này",
    });
  } else {
    return res.status(200).json({
      message: "Lấy thông tin thể loại thành công",
      data: isGenreExisting,
    });
  }
};

// Modify the genre information
export const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (name !== undefined) {
    const isGenreExisted = await db.Genre.findOne({
      where: { name: name.trim(), id: { [Op.ne]: id } },
    });
    if (isGenreExisted) {
      return res.status(409).json({
        message: "Tên thể loại này đã tồn tại, vui lòng thử lại",
      });
    }
  }
  const updateGenre = await db.Genre.update(req.body, {
    where: { id },
  });
  if (updateGenre[0] > 0) {
    return res.status(200).json({
      message: "Cập nhật thể loại thành công",
    });
  }
};

// Delete a genre
export const deleteGenre = async (req, res) => {
  const { id } = req.params;
  await db.Genre.destroy({
    where: { id },
  });
  return res.status(201).json({
    message: "Xoá thể loại thành công",
  });
};
