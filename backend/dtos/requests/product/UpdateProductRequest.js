import Joi from "joi";
class UpdateProductRequest {
  constructor(data) {
    this.name = data.name;
    this.artist = data.artist;
    this.label = data.label;
    this.release_at = data.release_at;
    this.description = data.description;
    this.image = data.image;
    this.active = data.active;
    this.genres = data.genres;
    this.formats = data.formats;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      artist: Joi.string().optional(),
      label: Joi.string().optional(),
      release_at: Joi.date().iso().optional(),
      description: Joi.string().max(1000).optional(),
      image: Joi.string().allow("").optional(),
      active: Joi.boolean().optional(),
      genres: Joi.array()
        .items(Joi.number().integer().positive())
        .min(1)
        .required(),
      formats: Joi.array().items(
        Joi.object({
          format_id: Joi.number().integer().required(),
          price: Joi.number().min(0).required(),
          old_price: Joi.number().min(0).optional(),
          stock: Joi.number().integer().required(),
        })
      ),
    });
    return schema.validate(data);
  }
}
export default UpdateProductRequest;
