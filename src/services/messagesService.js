import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const createMessage = async ({
  sender_id,
  receiver_id,
  message_text,
  sent_at,
}) => {
  try {
    const query = `
            INSERT INTO Messages (sender_id, receiver_id, message_text, sent_at)
            VALUES (@sender_id, @receiver_id, @message_text, @sent_at);
        `;

    const result = await poolRequest()
      .input("sender_id", sql.Int, sender_id)
      .input("receiver_id", sql.Int, receiver_id)
      .input("message_text", sql.Text, message_text)
      .input("sent_at", sql.DateTime, sent_at)
      .query(query);

    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};
