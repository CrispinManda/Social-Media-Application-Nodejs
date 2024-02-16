import { createPost, } from "../services/postService.js";
import {createPostSchema}  from '../validators/createPost.js'




export const createPostController = async (req, res) => {
  // Validate the request body against the Joi schema
  const { error } = createPostSchema.validate(req.body);

  // If there's a validation error, return a 400 status code with the error details
  if (error) {
    return res.status(400).json({ error: error.details });
  }

  // If the request body is valid, proceed with creating the post
  const { photo_url, user_id, content } = req.body;

  try {
    // Call the post creation service function
    const newPost = await createPost({ photo_url, user_id, content });

    // Respond with the newly created post object
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    // Handle any errors that occur during the post creation process
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};