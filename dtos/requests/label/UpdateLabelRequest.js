import Joi from "joi";
class UpdateLabelRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      image: Joi.string().allow("", null),
      description: Joi.string().optional(),
    });
    return schema.validate(data);
  }
}

export default UpdateLabelRequest;
