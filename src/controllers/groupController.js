import { createGroup, joinGroup } from "../services/groupService.js"; 
import { createGroupSchema } from "../validators/createGroup.js";


export const createGroupController = async (req, res) => {
  try {
    const { error } = createGroupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { group_name, description, created_by } = req.body;

    // Check if a group with the same name already exists
    const existingGroup = await getGroupByName(group_name);
    if (existingGroup) {
      return res
        .status(400)
        .json({ error: "A group with the same name already exists" });
    }

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

export const joinGroupController = async (req, res) => {
  try {
    const { group_id, user_id } = req.body;

    const rowsAffected = await joinGroup({ group_id, user_id });

    if (rowsAffected > 0) {
      return res.status(201).json({ message: "Joined group successfully" });
    } else {
      return res.status(500).json({ error: "Failed to join group" });
    }
  } catch (error) {
    console.error("Error joining group:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};