import users from "./user.schema.mjs";

export const userExists = (email) => {
  return users.findOne({ email });
};

//helper to generate default name for the user
const generateName = (email) => {
  let displayName = "";
  for (const char of email) {
    if (char === "@") return displayName;
    displayName += char;
  }
  return displayName;
};

export const createUser = async (profile) => {
  const newUser = {
    email: profile.emails[0].value,
    displayName: generateName(profile.emails[0].value),
  };
  try {
    await users.create(newUser);
  } catch (error) {
    throw error;
  }
};

export const findUserProfile = async (displayName) => {
  return users.findOne({ displayName });
};
