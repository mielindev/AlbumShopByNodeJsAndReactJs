import Joi from "joi";

class InsertPromotionRequest {
  constructor(data) {
    this.name = data.name;
    this.percent = data.percent;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
  }
  static validate(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      percent: Joi.number().min(0).max(100).required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().min(Joi.ref("start_date")).required(),
    });

    return schema.validate(data);
  }
}

export default InsertPromotionRequest;
