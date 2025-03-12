import Joi from "joi";

class UpdatePromotionRequest {
  constructor(data) {
    this.name = data.name;
    this.percent = data.percent;
    this.active = data.active;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).optional(),
      percent: Joi.number().min(0).max(100).optional(),
      active: Joi.boolean().optional(),
      start_date: Joi.date().optional(),
      end_date: Joi.date().min(Joi.ref("start_date")).optional(),
    });

    return schema.validate(data);
  }
}

export default UpdatePromotionRequest;
