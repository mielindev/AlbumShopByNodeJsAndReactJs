import Joi from "joi";

class InsertGenreDetailRequest {
  constructor(data) {
    this.genre_id = data.genre_id;
    this.product_id = data.product_id;
  }
  static validate(data) {
    const schema = Joi.object({
      genre_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
    });
    return schema.validate(data);
  }
}

export default InsertGenreDetailRequest;
