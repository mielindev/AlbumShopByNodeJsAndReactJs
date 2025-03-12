import Joi from "joi";

class UpdateFeedbackRequest {
  constructor(data) {
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.rating = data.rating;
    this.comment = data.comment;
  }

  static validate(data) {
    const schema = Joi.object({
      user_id: Joi.number().integer().optional(),
      product_id: Joi.number().integer().optional(),
      rating: Joi.number().precision(2).min(0).max(5).optional(),
      comment: Joi.string().allow("", null),
    });

    return schema.validate(data);
  }
}

export default UpdateFeedbackRequest;
