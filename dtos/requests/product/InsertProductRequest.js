import Joi from "joi";

class InsertProductRequest {
  constructor(data) {
    this.name = data.name;
    this.artist = data.artist;
    this.label_id = data.label_id;
    this.release_at = data.release_at;
    this.description = data.description;
    this.image = data.image;
    this.genres = data.genres;
    this.formats = data.formats;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      artist_id: Joi.number().integer().positive().required(),
      label_id: Joi.number().integer().positive().required(),
      release_at: Joi.number().integer().min(1900).max(2100).required(), // Define release year
      description: Joi.string().max(1000).optional(),
      image: Joi.string().allow("").optional(),
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

export default InsertProductRequest;
