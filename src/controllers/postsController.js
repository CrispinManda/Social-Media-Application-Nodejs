import {
  createPost,
  getAllPosts,
  deleteSinglePost,
  getUserPosts,
} from "../services/postService.js";
import {createPostSchema}  from '../validators/createPost.js'




export const createPostController = async (req, res) => {
  
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details });
  }
  const { photo_url, user_id, content } = req.body;
  try {
    const newPost = await createPost({ photo_url, user_id, content });

    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllPostsController = async (req, res) => {
  try {
    // Call the getAllPosts service function
    const posts = await getAllPosts();

    // If no posts found, return a message
    if (!posts || posts.message) {
      return res.status(404).json(posts);
    }

    // Respond with the list of posts
    return res.status(200).json(posts);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error retrieving posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteSinglePostController = async (req, res) => {
  const postId = req.params.id; // Extract the post ID from request parameters
  try {
    // Call the deleteSinglePost service function with the post ID
    const result = await deleteSinglePost(postId);

    // If post not found, return a message
    if (result.message === "Post not found") {
      return res.status(404).json(result);
    }

    // Respond with success message
    return res.status(200).json(result);
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserPostsController = async (req, res) => {
  const userId = req.params.id; // Extract the user ID from request parameters
  try {
    const posts = await getUserPosts(userId);

    if (!posts || posts.message) {
      return res.status(404).json(posts);
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
