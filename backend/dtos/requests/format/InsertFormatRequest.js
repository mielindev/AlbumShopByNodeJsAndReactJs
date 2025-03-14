import Joi from "joi";
class InsertFormatRequest {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow("", null),
    });
    return schema.validate(data);
  }
}

export default InsertFormatRequest;
