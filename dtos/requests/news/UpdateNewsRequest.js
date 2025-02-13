import Joi from "joi";

class UpdateNewsRequest {
  constructor(data) {
    this.title = data.title;
    this.image = data.image;
    this.content = data.content;
    this.active = data.active;
  }
  static validate(data) {
    const schema = Joi.object({
      title: Joi.string().optional(),
      image: Joi.string().uri().allow("").optional(),
      content: Joi.string().optional(),
      active: Joi.boolean().optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateNewsRequest;
