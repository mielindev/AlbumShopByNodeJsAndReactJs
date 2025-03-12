import Joi from "joi";

class InsertOrderRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.order_date = data.order_date;
    this.shipping_address = data.shipping_address;
    this.total_amount = data.total_amount;
    this.session_id = data.session_id;
    this.note = data.note;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().optional(),
      order_date: Joi.date().iso().required(),
      shipping_address: Joi.string().optional(),
      total_amount: Joi.number().integer().required(),
      session_id: Joi.string().optional(),
      note: Joi.string().optional(),
    });

    return schema.validate(data);
  }
}

export default InsertOrderRequest;
