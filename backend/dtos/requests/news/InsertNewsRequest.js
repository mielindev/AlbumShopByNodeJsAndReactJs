import Joi from "joi";

class InsertNewsRequest {
  constructor(data) {
    this.title = data.title;
    this.image = data.image;
    this.content = data.content;
    this.productIds = data.productIds;
  }
  static validate(data) {
    const schema = Joi.object({
      title: Joi.string().required(),
      image: Joi.string().uri().allow("").optional(),
      content: Joi.string().required(),
      productIds: Joi.array()
        .items(Joi.number().integer().positive())
        .optional(),
    });
    return schema.validate(data);
  }
}

export default InsertNewsRequest;
