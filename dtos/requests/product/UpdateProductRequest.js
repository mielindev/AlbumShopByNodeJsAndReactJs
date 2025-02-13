import Joi from "joi";
class UpdateProductRequest {
  constructor(data) {
    this.name = data.name;
    this.artist = data.artist;
    this.label_id = data.label_id;
    this.release_at = data.release_at;
    this.description = data.description;
    this.image = data.image;
    this.active = data.active;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      artist_id: Joi.number().integer().positive().optional(),
      label_id: Joi.number().integer().positive().optional(),
      release_at: Joi.date().iso().optional(),
      description: Joi.string().max(1000).optional(),
      image: Joi.string().allow("").optional(),
      active: Joi.boolean().optional(),
    });
    return schema.validate(data);
  }
}
export default UpdateProductRequest;
