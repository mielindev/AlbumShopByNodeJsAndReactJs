import Joi from "joi";

class UpdateNewsDetailRequest {
  constructor(data) {
    this.news_id = data.news_id;
    this.product_id = data.product_id;
  }
  static validate(data) {
    const schema = Joi.object({
      news_id: Joi.number().integer().optional(),
      product_id: Joi.number().integer().optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateNewsDetailRequest;
