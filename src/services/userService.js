import { poolRequest, sql } from "../utils/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const addUserService = async (newUser) => {
  try {
    // console.log("Received newUser:", newUser);
    // console.log("First Name:", newUser.first_name);
    // console.log("Last Name:", newUser.last_name);

    const result = await poolRequest()
      .input("first_name", sql.VarChar, newUser.first_name)
      .input("last_name", sql.VarChar, newUser.last_name)
      .input("username", sql.VarChar, newUser.username)
      .input("password", sql.VarChar, newUser.password)
      .input("email", sql.VarChar, newUser.email)
      .query(
        "INSERT INTO tbl_user (first_name, last_name, username, password, email, join_date) VALUES (@first_name, @last_name, @username, @password, @email, GETDATE())"
      );

    return result;
  } catch (error) {
    return error;
  }
};

export const findByCredentialsService = async (user) => {
  try {
    //if there is a user with this username
    const userFoundResponse = await poolRequest()
      .input("username", sql.VarChar, user.username)
      .query("SELECT * FROM tbl_user WHERE username = @username");
      
    if (userFoundResponse.recordset[0]) {
      //take user password from db and compare it with the password from the request with bcrypt
      if (
        await bcrypt.compare(
          user.password,
          userFoundResponse.recordset[0].password
        )
      ) {
        // send user details back without password and with a jwt token
        let token = jwt.sign(
          {
            id: userFoundResponse.recordset[0].id,
            first_name: userFoundResponse.recordset[0].first_name,
            last_name: userFoundResponse.recordset[0].last_name,
            username: userFoundResponse.recordset[0].username,
            email: userFoundResponse.recordset[0].email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" } // 2hours
        );
        const { password, ...user } = userFoundResponse.recordset[0];
        return { user, token: `JWT ${token}` };
      } else {
        return { error: "Invalid Credentials" };
      }
    } else {
      return { error: "Invalid Credentials" };
    }
  } catch (error) {
    return error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const query = `
            DELETE FROM tbl_user
            WHERE user_id = @userId;
        `;

    const result = await poolRequest().input("userId", userId).query(query);

    // Check if any rows were affected by the delete operation
    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      // If at least one row was affected, return true to indicate success
      return true;
    } else {
      // If no rows were affected, it means the user does not exist
      return false;
    }
  } catch (error) {
    // If any error occurs during the deletion process, throw the error
    throw error;
  }
};


export const getAllUsers = async () => {
  try {
    const query = `
            SELECT *
            FROM tbl_user;
        `;

    const result = await poolRequest().query(query);

    return result.recordset; // Assuming the result is an array of user objects
  } catch (error) {
    throw error;
  }
};


export const getUserById = async (userId) => {
  try {
    const query = `
            SELECT *
            FROM tbl_user
            WHERE user_id = @userId;
        `;

    const result = await poolRequest()
      .input("userId", sql.Int, userId)
      .query(query);

    // Check if the result contains any rows
    if (result.recordset.length > 0) {
      return result.recordset[0]; // Return the first user found
    } else {
      return null; // If no user found, return null
    }
  } catch (error) {
    throw error;
  }
};