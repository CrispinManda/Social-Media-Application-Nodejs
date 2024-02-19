import { createMessageSchema } from "../validators/messageValidators.js";
import {
  createMessage,
  deleteMessage,
  deleteSingleMessage,
} from "../services/messagesService.js"; 


export const createMessageController = async (req, res) => {
  try {
    const { error } = createMessageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { sender_id, receiver_id, message_text, sent_at } = req.body;

    const rowsAffected = await createMessage({
      sender_id,
      receiver_id,
      message_text,
      sent_at,
    });

    if (rowsAffected > 0) {
      return res.status(201).json({ message: "Message sent successfully" });
    } else {
      return res.status(500).json({ error: "Failed to send message" });
    }
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessageController = async (req, res) => {
  const { sender_id, receiver_id } = req.body;

  try {
    // Call the deleteMessage service function with provided criteria
    const rowsAffected = await deleteMessage({ sender_id, receiver_id });

    // Respond with success or failure message based on rowsAffected
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "Messages deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "No messages found matching the criteria" });
    }
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteSingleMessageController = async (req, res) => {
  const  message_id  = req.params.message_id; // Extract the message_id from request parameters
    console.log( message_id);
  try {
    // Call the deleteSingleMessage service function with the message_id
    const rowsAffected = await deleteSingleMessage(message_id);

    // Check if the message was deleted successfully
    if (rowsAffected > 0) {
      return res.status(200).json({ message: "Message deleted successfully" });
    } else {
      return res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};