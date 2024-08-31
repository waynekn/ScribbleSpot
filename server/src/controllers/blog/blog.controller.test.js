import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/mongodb/mongo";
import { blogRouter } from "../../routes/blog/blog.router";
import { app, authenticateJWT } from "../user/user.controller.test";

app.use("/posts", authenticateJWT, blogRouter);

describe("test blog controller", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  const blog = {
    title: "Test-title",
    blogContent: "<p> Hello world </p>",
  };

  // test POST requests
  describe("POST /posts/blog", () => {
    it("should POST a blog if title doesnt exist", async () => {
      const response = await request(app).post("/posts/blog").send(blog);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Post successfuly uploaded");
    });

    it("should return 400 if title exists", async () => {
      const response = await request(app).post("/posts/blog").send(blog);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Can't have duplicate titles");
    });

    it("should return unknown error for errors which are not from mongodb", async () => {
      const response = await request(app).post("/posts/blog").send({});

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("An unknown error occurred");
    });
  });

  //test GET titles
  describe("GET /posts/titles", () => {
    it("should return an array of titles", async () => {
      const response = await request(app).get("/posts/titles");

      expect(response.status).toBe(200);
      expect(response.body.titles).toContainEqual({
        title: "Test-title",
      });
    });
  });

  //test GET content
  describe("POST /posts/content", () => {
    const fetchedBlog = {
      displayName: "testUser",
      content: "<p> Hello world </p>",
    };

    it("should return an object containing blog content", async () => {
      const response = await request(app)
        .post("/posts/content")
        .send({ title: blog.title });

      expect(response.status).toBe(200);
      expect(response.body.blog).toEqual(fetchedBlog);
    });

    it("should return 400 when blog is not found", async () => {
      const response = await request(app).post("/posts/content").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Blog not found");
    });
  });
});
