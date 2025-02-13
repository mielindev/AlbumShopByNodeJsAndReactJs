import Joi from "joi";

class UpdateOrderRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.order_date = data.order_date;
    this.shipping_address = data.shipping_address;
    this.status = data.status;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().optional(),
      order_date: Joi.date().iso().optional(),
      shipping_address: Joi.string().optional(),
      status: Joi.number().integer().optional(),
    });

    return schema.validate(data);
  }
}

export default UpdateOrderRequest;
