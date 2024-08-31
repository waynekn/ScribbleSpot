import express from "express";
import request from "supertest";
import userRouter from "../../routes/user/user.router";
import { mongoConnect, mongoDisconnect } from "../../services/mongodb/mongo";

export const app = express();

app.use(express.json());
export const authenticateJWT = (req, res, next) => {
  req.user = { id: "66d1c86755e232cfcaacbc26" };
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
      .get("/users/profile")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(response.body.profile).toEqual({
      email: "testUser123@gmail.com",
      displayName: "testUser",
      profilePicture: "DEFAULT_PROFILE_PICTURE",
      dateJoined: "2024-08-06T12:48:50.257Z",
    });
  });
});
