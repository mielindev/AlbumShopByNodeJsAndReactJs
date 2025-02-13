import Joi from "joi";

class InsertCartItemRequest {
  constructor(data) {
    this.cart_id = data.cart_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
  }

  static validate(data) {
    const schema = Joi.object({
      cart_id: Joi.number().integer().optional(),
      product_id: Joi.string().required(),
      quantity: Joi.number().integer().default(1).min(1).required(),
    });

    return schema.validate(data);
  }
}

export default InsertCartItemRequest;
