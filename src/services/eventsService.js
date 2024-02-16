import { poolRequest, closePool, sql } from "../utils/dbConnect.js";

export const createEvent = async ({
  event_name,
  event_date,
  location,
  description,
  created_by,
}) => {
  try {
    const query = `
            INSERT INTO Events (event_name, event_date, location, description, created_by, created_at)
            VALUES (@event_name, @event_date, @location, @description, @created_by, GETDATE());
        `;

    const result = await poolRequest()
      .input("event_name", sql.VarChar, event_name)
      .input("event_date", sql.Date, event_date)
      .input("location", sql.VarChar, location)
      .input("description", sql.Text, description)
      .input("created_by", sql.Int, created_by)
      .query(query);

    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};
