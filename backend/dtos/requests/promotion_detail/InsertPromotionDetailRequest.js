import Joi from "joi";

class InsertPromotionDetailRequest {
  constructor(data) {
    this.promotion_id = data.promotion_id;
    this.product_id = data.product_id;
  }
  static validate(data) {
    const schema = Joi.object({
      promotion_id: Joi.number().min(0).required(),
      product_id: Joi.number().min(0).required(),
    });

    return schema.validate(data);
  }
}

export default InsertPromotionDetailRequest;
