import users from "../../schemas/user/user.schema.js";

export const userExists = (email) => users.findOne({ email });

export const fetchUserProfile = (userName) =>
  users.findOne({ userName: userName }, { _id: 0, __v: 0 });

export const updateDisplayName = async (id, userName) => {
  const existingUser = await users.findOne({ userName });

  if (existingUser) throw new Error("Username is already taken");

  return users.findByIdAndUpdate({ _id: id }, { $set: { userName: userName } });
};

const generateName = (email) => {
  let userName = "";
  for (const char of email) {
    if (char === "@") return userName;
    userName += char;
  }
  return userName;
};

export const createUser = (profile) => {
  const newUser = {
    email: profile.emails[0].value,
    userName: generateName(profile.emails[0].value),
    dateJoined: new Date(),
    profilePicture: "DEFAULT_PROFILE_PICTURE", //key of default profile picture on s3 bucket
  };
  return users.create(newUser);
};
