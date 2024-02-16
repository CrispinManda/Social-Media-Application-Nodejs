import { createEventSchema } from "../validators/createEvents.js";
import { createEvent } from "../services/eventsService.js"; 



export const createEventController = async (req, res) => {
  try {
    const { error } = createEventSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { event_name, event_date, location, description, created_by } =
      req.body;

    const rowsAffected = await createEvent({
      event_name,
      event_date,
      location,
      description,
      created_by,
    });

    if (rowsAffected > 0) {
      return res.status(201).json({ message: "Event created successfully" });
    } else {
      return res.status(500).json({ error: "Failed to create event" });
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
