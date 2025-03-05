import { Op, Sequelize } from "sequelize";
import db from "../models";
import { getImageUrl } from "../helpers/imageHelper";

// Add a new artist
export const insertArtist = async (req, res) => {
  const { name } = req.body;

  const isArtistExisting = await db.Artist.findOne({
    where: { name: name.trim() },
  });
  if (isArtistExisting) {
    return res.status(409).json({
      message: "Nghệ sĩ này đã tồn tại",
    });
  }
  const artist = await db.Artist.create(req.body);
  return res.status(201).json({
    message: "Thêm nghệ sĩ thành công",
    data: artist,
  });
};

// Get the list of artists
export const getArtists = async (req, res) => {
  const { search = "", page = 1, pageSize = 5 } = req.query;
  const offset = (page - 1) * pageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { bio: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  const [artists, totalArtists] = await Promise.all([
    db.Artist.findAll({
      where: whereClause,
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Artist.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách nghệ sĩ thành công",
    data: artists.map((artist) => ({
      ...artist.get({ plain: true }),
      image: getImageUrl(artist.image),
    })),
    current_page: parseInt(page, 10),
    total_pages: Math.ceil(totalArtists / pageSize),
    total: totalArtists,
  });
};

// Get the details of an artist
export const getArtistById = async (req, res) => {
  const { id } = req.params;
  const artist = await db.Artist.findByPk(id);
  if (!artist) {
    return res.status(404).json({
      message: "Không tìm thấy nghệ sĩ",
    });
  }
  return res.status(200).json({
    message: "Lấy thông tin nghệ sĩ thành công",
    data: artist,
  });
};

// Modify the artist information
export const updateArtists = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const isArtistExisted = await db.Artist.findByPk(id);
  if (!isArtistExisted) {
    return res.status(404).json({
      message: `Không tìm thấy nghệ sĩ có id bằng ${id}`,
    });
  }
  if (name !== undefined) {
    const isDuplicated = await db.Artist.findOne({
      where: { name, id: { [Op.ne]: id } },
    });
    if (isDuplicated) {
      return res.status(409).json({
        message: "Nghệ sĩ này đã tồn tại, vui lòng thử lại",
        data: isDuplicated,
      });
    }
  }
  await db.Artist.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật thông tin nghệ sĩ thành công",
  });
};

// Delete a aritst
export const deleteArtists = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.Artist.destroy({ where: { id } });
  if (!deleted) {
    return res.status(404).json({
      message: "Không tìm thấy nghệ sĩ",
    });
  } else {
    return res.status(201).json({
      message: "Xoá nghệ sĩ thành công",
    });
  }
};
