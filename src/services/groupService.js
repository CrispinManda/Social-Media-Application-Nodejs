import { poolRequest, sql } from "../utils/dbConnect.js";


export const createGroup = async ({ group_name, description, created_by }) => {
  try {
    const query = `
            INSERT INTO Groups (group_name, description, created_by, created_at)
            VALUES (@group_name, @description, @created_by, GETDATE());
        `;

    const result = await poolRequest()
      .input("group_name", sql.VarChar, group_name)
      .input("description", sql.VarChar, description)
      .input("created_by", sql.Int, created_by)
      .query(query);

    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};