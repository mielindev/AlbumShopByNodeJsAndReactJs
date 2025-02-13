import Joi from "joi";
class UpdateArtistRequest {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.bio = data.bio;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().optional(),
      image: Joi.string().allow("", null),
      bio: Joi.string().allow("", null),
    });
    return schema.validate(data);
  }
}

export default UpdateArtistRequest;
