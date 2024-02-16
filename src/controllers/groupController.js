import { createGroup } from "../services/groupService.js"; 
import { createGroupSchema } from "../validators/createGroup.js";


export const createGroupController = async (req, res) => {
  try {
    const { error } = createGroupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { group_name, description, created_by } = req.body;

    const rowsAffected = await createGroup({
      group_name,
      description,
      created_by,
    });

    if (rowsAffected > 0) {
      return res.status(201).json({ message: "Group created successfully" });
    } else {
      return res.status(500).json({ error: "Failed to create group" });
    }
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};