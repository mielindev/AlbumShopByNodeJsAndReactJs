import Joi from "joi";

class LoginUserRequest {
  constructor(data) {
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
  }
  static validate(data) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),
      password: Joi.string().min(6).max(16).required(),
    });

    return schema.validate(data);
  }
}

export default LoginUserRequest;
