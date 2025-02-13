import Joi from "joi";

class UpdatePromotionDetailRequest {
  constructor(data) {
    this.promotion_id = data.promotion_id;
    this.product_id = data.product_id;
  }
  static validate(data) {
    const schema = Joi.object({
      promotion_id: Joi.number().min(1).optional(),
      product_id: Joi.number().min(1).optional(),
    });

    return schema.validate(data);
  }
}

export default UpdatePromotionDetailRequest;
