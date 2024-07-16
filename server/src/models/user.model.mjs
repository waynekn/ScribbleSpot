import users from "./user.schema.mjs";

export const userExists = (email) => {
  return users.findOne({ email });
};

const getName = (email) => {
  let name = "";
  for (const char of email) {
    if (char === "@") return name;
    name += char;
  }
  return name;
};

export const createUser = async (profile) => {
  const newUser = {
    email: profile.emails[0].value,
    name: getName(profile.emails[0].value),
  };

  try {
    const result = await users.create(newUser);
    return result;
  } catch (error) {
    console.warn(error);
  }
};
