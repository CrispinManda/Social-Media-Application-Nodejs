import Joi from "joi"; 

export const createGroupSchema = Joi.object({
  group_name: Joi.string().required(),
  description: Joi.string(),
  created_by: Joi.number().integer().positive().required(),
});
