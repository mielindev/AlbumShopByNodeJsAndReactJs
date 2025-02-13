import Joi from "joi";

class InsertUserRequest {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.address = data.address;
    this.avatar = data.avatar;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(255).required(),
      phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
      address: Joi.string().max(500).optional(),
      avatar: Joi.string().uri().allow("").optional(),
    });

    return schema.validate(data);
  }
}

export default InsertUserRequest;
