import Joi from "joi";

class InsertUserRequest {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.phone = data.phone;
    this.address = data.address;
  }

  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(255).optional(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(16).required(),
      phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional(),
      address: Joi.string().max(500).optional(),
    });

    return schema.validate(data);
  }
}

export default InsertUserRequest;
