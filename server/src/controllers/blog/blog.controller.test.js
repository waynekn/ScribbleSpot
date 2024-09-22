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

  // Tests for creating and handling blog posts
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

  // Tests for retrieving blog titles
  describe("GET /posts/titles", () => {
    it("should return an array of titles", async () => {
      const response = await request(app).post("/posts/titles").send({
        userName: "testUser",
      });

      expect(response.status).toBe(200);
      expect(response.body.titles).toContainEqual({
        title: "Test-title",
        titleSlug: "test-title",
      });
    });
  });

  // Tests for retrieving blog content
  describe("POST /posts/content", () => {
    it("should return an object containing blog content", async () => {
      const response = await request(app)
        .post("/posts/content")
        .send({ titleSlug: "test-title", userName: "testUser" });

      expect(response.status).toBe(200);
      expect(response.body.blog).toBeDefined();
      expect(response.body.blog.userName).toBe("testUser");
      expect(response.body.blog.content).toBe("<p> Hello world </p>");
      expect(response.body.blog.title).toBe("Test-title");
      expect(response.body.blog.likeCount).toBe(0);
      expect(response.body.blog.userHasLikedBlog).toBe(false);
      expect(response.body.blog.userHasDislikedBlog).toBe(false);

      // Validate that the datePosted field exists and is a valid ISO 8601 date
      expect(response.body.blog.datePosted).toBeDefined();
      const datePosted = new Date(response.body.blog.datePosted);
      expect(datePosted.toISOString()).toBe(response.body.blog.datePosted);
    });

    it("should return 500 if an error occurs", async () => {
      const response = await request(app).post("/posts/content").send({});

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("A server errror occured");
    });
  });

  //Tests for deleting a blog post
  describe("POST /posts/blog/delete", () => {
    it("should return 200 for successful delete", async () => {
      const response = await request(app)
        .post("/posts/blog/delete")
        .send({ title: blog.title });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Blog successfully deleted");
    });

    it("should return 400 for a non existent title", async () => {
      const response = await request(app).post("/posts/blog/delete").send({
        title: blog.title,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Could not find blog");
    });
  });
});
