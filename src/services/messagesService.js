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


export const deleteMessage = async ({ sender_id, receiver_id }) => {
  try {
    // Construct the WHERE clause based on provided criteria
    let condition = "";
    const inputParams = {};

    if (sender_id) {
      condition += "sender_id = @sender_id";
      inputParams.sender_id = sender_id;
    }

    if (receiver_id) {
      condition += condition ? " AND " : "";
      condition += "receiver_id = @receiver_id";
      inputParams.receiver_id = receiver_id;
    }

    const query = `
            DELETE FROM Messages
            WHERE ${condition};
        `;

    const result = await poolRequest()
      .input("sender_id", sql.Int, sender_id)
      .input("receiver_id", sql.Int, receiver_id)
      .query(query);

    return result.rowsAffected[0];
  } catch (error) {
    throw error;
  }
};


export const deleteSingleMessage = async (message_id) => {
  try {
    const query = `
            DELETE FROM Messages
            WHERE message_id = @message_id;
        `;

    const result = await poolRequest()
      .input("message_id", sql.Int, message_id)
      .query(query);
      console.log('i reached here');

    return result.rowsAffected[0];
  } catch (error) {
    throw error;
  }
};