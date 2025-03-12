import Joi from "joi";
class InsertLabelRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().allow("", null),
      description: Joi.string().optional(),
    });
    return schema.validate(data);
  }
}

export default InsertLabelRequest;
