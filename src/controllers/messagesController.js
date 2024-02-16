import { createMessageSchema } from "../validators/messageValidators.js";
import { createMessage } from "../services/messagesService.js"; 


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
