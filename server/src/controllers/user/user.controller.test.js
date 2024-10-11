import express from "express";
import request from "supertest";
import userRouter from "../../routes/user.router";
import { mongoConnect, mongoDisconnect } from "../../services/mongodb/mongo";

export const app = express();

app.use(express.json());
export const authenticateJWT = (req, res, next) => {
  req.user = { id: "66d1c86755e232cfcaacbc26", userName: "testUser" };
  next();
};

app.use("/users", authenticateJWT, userRouter);

describe("GET /users/profile", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  it("should return user if profile exists", async () => {
    const response = await request(app)
      .post("/users/profile")
      .send({ userName: "testUser" })
      .expect("Content-Type", /json/);

    const user = {
      _id: "66d1c86755e232cfcaacbc26",
      email: "testUser123@gmail.com",
      userName: "testUser",
      profilePicture: "DEFAULT_PROFILE_PICTURE",
      dateJoined: "2024-08-06T12:48:50.257Z",
      likedBlogs: [],
    };

    expect(response.status).toBe(200);
    expect(response.body.profile).toEqual(user);
  });
});
