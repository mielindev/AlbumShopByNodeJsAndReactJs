import Joi from "joi";

class InsertFormatDetailRequest {
  constructor(data) {
    this.format_id = data.format_id;
    this.product_id = data.product_id;
    this.price = data.price;
    this.old_price = data.old_price;
    this.stock = data.stock;
  }
  static validate(data) {
    const schema = Joi.object({
      format_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      price: Joi.number().integer().min(0).required(),
      old_price: Joi.number().integer().min(0).optional(),
      stock: Joi.number().integer().min(0).required(),
    });
    return schema.validate(data);
  }
}

export default InsertFormatDetailRequest;
