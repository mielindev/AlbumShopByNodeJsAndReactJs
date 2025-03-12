import Joi from "joi";

class InsertFeedBackRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.rating = data.rating;
    this.comment = data.comment;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      rating: Joi.number().precision(2).min(0).max(5).required(),
      comment: Joi.string().allow("", null),
    });

    return schema.validate(data);
  }
}

export default InsertFeedBackRequest;
