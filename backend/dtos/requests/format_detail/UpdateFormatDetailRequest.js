import Joi from "joi";

class UpdateFormatDetailRequest {
  constructor(data) {
    this.format_id = data.format_id;
    this.product_id = data.product_id;
    this.price = data.price;
    this.old_price = data.old_price;
    this.stock = data.stock;
  }
  static validate(data) {
    const schema = Joi.object({
      format_id: Joi.number().integer().optional(),
      product_id: Joi.number().integer().optional(),
      price: Joi.number().integer().min(0).optional(),
      old_price: Joi.number().integer().min(0).optional(),
      stock: Joi.number().integer().min(0).optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateFormatDetailRequest;
