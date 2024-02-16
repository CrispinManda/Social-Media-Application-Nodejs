import bcrypt from "bcrypt";
import {
  addUserService,
  findByCredentialsService,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../services/userService.js";
import { userValidator, userLoginValidator,} from "../validators/userValidator.js";
import {sendServerError,sendCreated,notAuthorized,} from "../helper/helperFunctions.js";


export const registerUser = async (req, res) => {
  const { first_name, last_name, username, password, email } = req.body;
  // console.log(req.body);
  const { error } = userValidator({
    first_name,
    last_name,
    username,
    password,
    email,
  });
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        first_name,
        last_name,
        username,
        password: hashedPassword,
        email,
      };
      const response = await addUserService(newUser);
      if (response.message) {
        sendServerError(res, response.message);
      } else {
        sendCreated(res, "User created successfully");
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};



export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const { error } = userLoginValidator({ username, password });
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const userResponse = await findByCredentialsService({
        username,
        password,
      });
      if (userResponse.error) {
        notAuthorized(res, userResponse.error);
      } else {
        res.status(200).send(userResponse);
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    // Call the getAllUsers service function
    const users = await getAllUsers();

    // Respond with the list of users
    return res.status(200).json(users);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error retrieving users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getUserByIdController = async (req, res) => {
  const userId = req.params.id; // Extract the user ID from request parameters
  try {
    // Call the getUserById service function with the user ID
    const user = await getUserById(userId);

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user object
    return res.status(200).json(user);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error retrieving user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteUser = async (req, res) => {
  const userId = req.params.id; // Assuming you're passing the user ID in the request params
  try {
    // Call the user deletion service function
    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with a success message or any other relevant data
    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
