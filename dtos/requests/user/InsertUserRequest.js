import Joi from "joi";

class InsertUserRequest {
  constructor(data) {
    this.username = data.username;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  static validate(data) {
    const schema = Joi.object({
      username: Joi.string().min(6).max(50).required(),
      name: Joi.string().min(1).max(255).optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(32).required(),
    });

    return schema.validate(data);
  }
}

export default InsertUserRequest;
