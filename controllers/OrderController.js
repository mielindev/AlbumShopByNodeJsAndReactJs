import { Op } from "sequelize";
import db from "../models";
import { orderStatus } from "../constants/orderStatus";

// Add a new order

// export const insertOrder = async (req, res) => {
//   const { user_id } = req.body;
//   const isUserExisted = await db.User.findOne({
//     where: { id: user_id },
//   });
//   if (!isUserExisted) {
//     return res.status(404).json({
//       message: "Người dùng không tồn tại",
//     });
//   }
//   const order = await db.Order.create(req.body);
//   return res.status(201).json({
//     message: "Thêm đơn hàng thành công",
//     data: order,
//   });
// };

// Get the list of orders
export const getOrders = async (req, res) => {
  const { search = "", page = 1, pageSize = 5, status } = req.query;
  const offset = (page - 1) * pageSize;
  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        // { order_date: { [Op.like]: `%${search}%` } },
        { shipping_address: { [Op.like]: `%${search}%` } },
      ],
    };
  }
  if (status) {
    whereClause.status = status;
  }
  const [orders, totalOrders] = await Promise.all([
    db.Order.findAll({
      where: whereClause,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.OrderDetail,
          as: "order_details",
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: {
            model: db.Product,
            as: "product_name",
            attributes: ["name"],
          },
        },
      ],
      limit: parseInt(pageSize, 10),
      offset,
    }),
    db.Order.count({
      where: whereClause,
    }),
  ]);
  return res.status(200).json({
    message: "Lấy danh sách đơn hàng thành công",
    data: orders,
    current_page: page,
    total_pages: Math.ceil(totalOrders / pageSize),
    total: totalOrders,
  });
};

// Get the details of an order
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await db.Order.findByPk(id, {
    include: [{ model: db.OrderDetail, as: "order_details" }],
  });
  if (!order) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  }
  return res.status(200).json({
    message: "Lấy thông tin đơn hàng thành công",
    data: order,
  });
};

// Modify the order information
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const isOrderExisted = await db.Order.findOne({ where: { id } });
  if (!isOrderExisted) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  }
  await db.Order.update(req.body, { where: { id } });
  return res.status(200).json({
    message: "Cập nhật thông tin đơn hàng thành công",
  });
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const [updated] = await db.Order.update(
    { status: orderStatus.FAILED },
    { where: { id } }
  );
  if (!updated) {
    return res.status(404).json({
      message: "Không tìm thấy đơn hàng",
    });
  } else {
    return res.status(201).json({
      message: "Đơn hàng đã được đánh dấu là thất bại",
    });
  }
};
