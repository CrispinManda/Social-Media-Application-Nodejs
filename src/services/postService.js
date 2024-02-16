import { poolRequest, sql } from "../utils/dbConnect.js";


export const createPost = async ({ photo_url, user_id, content }) => {
  try {
    const insertQuery = `
      INSERT INTO posts (photo_url, user_id, content, post_date)
      VALUES (@photo_url, @user_id, @content, GETDATE());
    `;

    // Execute the insert query with SQL parameters
    const request = poolRequest()
      .input("photo_url", sql.VarChar, photo_url)
      .input("user_id", sql.Int, user_id)
      .input("content", sql.VarChar, content);

    await request.query(insertQuery);

    // Retrieve the newly inserted post
    const selectQuery = `
      SELECT TOP 1 *
      FROM posts
      ORDER BY post_date DESC;
    `;

    const result = await poolRequest().query(selectQuery);

    // Return the first row from the result set
    return result.recordset[0];
  } catch (error) {
    // If any error occurs during the post creation process, throw the error
    throw error;
  }
};


export const getAllPosts = async () => {
  try {
    const query = `
            SELECT *
            FROM Posts;
        `;

    const result = await poolRequest().query(query);

    if (!result.recordset || result.recordset.length === 0) {
      return { message: "No posts found" };
    }

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const deleteSinglePost = async (postId) => {
  try {
    const query = `
            DELETE FROM Posts
            WHERE post_id = @postId;
        `;

    const result = await poolRequest()
      .input("postId", sql.Int, postId)
      .query(query);

    if (result.rowsAffected[0] === 0) {
      return { message: "Post not found" };
    }

    return { message: "Post deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const query = `
            SELECT *
            FROM Posts
            WHERE user_id = @userId;
        `;

    const result = await poolRequest()
      .input("userId", sql.Int, userId)
      .query(query);

    if (!result.recordset || result.recordset.length === 0) {
      return { message: "You do not have posts yet!. Go ahead and post. " };
    }

    return result.recordset;
  } catch (error) {
    throw error;
  }
};