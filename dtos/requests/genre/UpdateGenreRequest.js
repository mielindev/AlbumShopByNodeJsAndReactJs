import Joi from "joi";
class UpdateGenreRequest {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().allow("", null),
    });
    return schema.validate(data);
  }
}

export default UpdateGenreRequest;
