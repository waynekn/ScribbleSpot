import users from "../../schemas/user/user.schema.js";

export const fetchProfileByEmail = (email) => users.findOne({ email });

export const fetchProfileByUserName = (userName) =>
  users.findOne({ userName: userName }, { _id: 0, __v: 0 });

export const updateUserName = async (id, userName) => {
  return users.findByIdAndUpdate({ _id: id }, { $set: { userName: userName } });
};

export const createUser = (user) => {
  const newUser = {
    ...user,
    dateJoined: new Date(),
    profilePicture: "DEFAULT_PROFILE_PICTURE", //key of default profile picture on s3 bucket
  };
  return users.create(newUser);
};
