import Joi from "joi";
import { orderStatus } from "../../../constants/orderStatus";

class UpdateOrderRequest {
  constructor(data) {
    this.shipping_address = data.shipping_address;
    this.status = data.status;
    this.note = data.note;
    this.phone = data.phone;
  }

  static validate(data) {
    const schema = Joi.object({
      shipping_address: Joi.string().optional(),
      status: Joi.number()
        .integer()
        .valid(...Object.values(orderStatus))
        .optional(),
      note: Joi.string().optional(),
      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    });

    return schema.validate(data);
  }
}

export default UpdateOrderRequest;
