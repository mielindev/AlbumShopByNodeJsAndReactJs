import Joi from "joi";

class LoginUserRequest {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
  }
  static validate(data) {
    const schema = Joi.object({
      username: Joi.string().min(6).max(50).required(),
      password: Joi.string().min(6).max(50).required(),
    });

    return schema.validate(data);
  }
}

export default LoginUserRequest;
