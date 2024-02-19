import emailTemp from "../Templates/emailTemp.js";
import { transporter } from "../middlewares/mailTransporter.js";
import dotenv from "dotenv";
import {
  findNewlyRegisteredUsers,
  markUserAsWelcomed,
} from "../services/userService.js";
import logger from "../utils/logger.js";
dotenv.config();

export const mailOptions = {
  from: process.env.EMAIL,
  to: "crispinmanda@gmail.com",
  subject: "WELCOME TO HIPHONIC SOCIAL MEDIA!",
  html: emailTemp,
};

export const sendWelcomeMail = (email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "WELCOME TO HIPHONIC SOCIAL MEDIA!",
    html: emailTemp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};



export const sendWelcomeEmailToNewUsers = async () => {
  try {
    const newlyRegisteredUsers = await findNewlyRegisteredUsers();

    if (newlyRegisteredUsers.length === 0) {
      console.log("No new users found");
      logger.info("No new users");
      return; // Exit early if there are no new users
    }

    console.log("Newly registered users:", newlyRegisteredUsers);
    logger.info("Newly registered users:", newlyRegisteredUsers);

    for (const user of newlyRegisteredUsers) {
      // Send welcome email to each user
      await sendWelcomeMail(user.email);

      // Update the user's isWelcomed flag in the database
      await markUserAsWelcomed(user.user_id);
    }
  } catch (error) {
    console.error("Error sending welcome emails:", error);
    logger.error("Error sending welcome emails:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};
