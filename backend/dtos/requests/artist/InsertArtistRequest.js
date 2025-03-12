import Joi from "joi";
class InsertArtistRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.bio = data.bio;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().allow("", null),
      bio: Joi.string().allow("", null),
    });
    return schema.validate(data);
  }
}

export default InsertArtistRequest;
