import bcrypt from "bcrypt";
import {
  fetchProfileByEmail,
  fetchProfileByUserName,
  createUser,
} from "../../models/user/user.model.js";
import generateToken from "../../utils/jwt/token.js";

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} plainTextPassword - The password submitted by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the passwords match, otherwise `false`.
 * @throws {Error} Throws an error if there is an issue comparing the passwords.
 */

const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

/**
 * Handles user signup by hashing the user's password and creating a new user profile.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {Object} req.body.user - The user object for signup.
 * @param {string} req.body.user.emailOrUserName - The username or email of the user.
 * @param {string} req.body.user.password - The password for the user.
 * @param {Object} res - The response object.
 * @returns {void} - user object or error
 */
export const signInLocalUser = async (req, res) => {
  const user = req.body.user;
  const userNameRegex = /^[0-9A-Za-z]{6,16}$/g;

  if (!user || !user.password || !user.emailOrUserName) {
    return res
      .status(400)
      .json({ error: "Incomplete authentication credentials" });
  }

  const authCredential = user.emailOrUserName;
  const isUserName = userNameRegex.test(authCredential);
  //Client validation ensures its either an email or username so
  //we dont need to check both(username and email)

  try {
    const profile = isUserName
      ? await fetchProfileByUserName(authCredential)
      : await fetchProfileByEmail(authCredential);

    if (!profile) {
      return res
        .status(404)
        .json({ error: `Could not find ${user.emailOrUserName}` });
    }

    const isPasswordValid = await comparePasswords(
      user.password,
      profile.password
    );

    if (isPasswordValid) {
      const token = generateToken(profile);
      res.cookie("ssjwt", token, {
        httpOnly: true,
        sameSite: "Strict",
      });
      return res.status(200).json({ profile });
    }

    res.status(403).json({ error: "Invalid username, email or password" });
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred during authentication. Please try again after a while",
    });
  }
};

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 * @throws {Error} Throws an error if hashing fails.
 */
const hashPassword = (password) => {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

/**
 * Handles user signup by hashing the user's password and creating a new user profile.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {Object} req.body.user - The user object for signup.
 * @param {string} req.body.user.userName - The username of the user.
 * @param {string} req.body.user.email - The email address of the user.
 * @param {string} req.body.user.password - The password for the user.
 * @param {Object} res - The response object.
 * @returns {void} - user object or error
 */
export const signUpLocalUser = async (req, res) => {
  try {
    const user = req.body.user;

    if (!user || !user.password || !user.userName || !user.email) {
      return res
        .status(400)
        .json({ error: "Incomplete authentication credentials" });
    }

    const existingUserName = await fetchProfileByUserName(user.userName);
    const existingEmail = await fetchProfileByEmail(user.email);

    if (existingUserName) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;

    const profile = await createUser(user);

    const token = generateToken(profile);
    res.cookie("ssjwt", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    return res.status(201).json({ profile });
  } catch (error) {
    return res.status(500).json({
      error:
        "An error occurred during authentication. Please try again after a while",
    });
  }
};
