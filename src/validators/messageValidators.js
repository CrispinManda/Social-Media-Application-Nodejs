import Joi from "joi";

export const createMessageSchema = Joi.object({
  sender_id: Joi.number().integer().positive().required(),
  receiver_id: Joi.number().integer().positive().required(),
  message_text: Joi.string().required(),
  sent_at: Joi.date().iso().required(),
});
