import Joi from "joi";

export const createEventSchema = Joi.object({
  event_name: Joi.string().required(),
  event_date: Joi.date().iso().required(),
  location: Joi.string().required(),
  description: Joi.string(),
  created_by: Joi.number().integer().positive().required(),
});
