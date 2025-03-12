import Joi from "joi";

class InsertCartItemRequest {
  constructor(data) {
    this.cart_id = data.cart_id;
    this.product_id = data.product_id;
    this.format_id = data.format_id;
    this.quantity = data.quantity;
  }

  static validate(data) {
    const schema = Joi.object({
      cart_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      format_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(0).required(),
    });

    return schema.validate(data);
  }
}

export default InsertCartItemRequest;
