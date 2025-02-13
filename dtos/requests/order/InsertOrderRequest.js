import Joi from "joi";

class InsertOrderRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.order_date = data.order_date;
    this.shipping_address = data.shipping_address;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().required(),
      order_date: Joi.date().iso().required(),
      shipping_address: Joi.string().required(),
    });

    return schema.validate(data);
  }
}

export default InsertOrderRequest;
