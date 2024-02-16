import Joi from "joi";

// Define the Joi schema for post creation
export const createPostSchema = Joi.object({
  photo_url: Joi.string().uri().required(),
  user_id: Joi.string().required(),
  content: Joi.string().required(),
});
