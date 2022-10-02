const request = require("supertest");
const { describe, it } = require("mocha");
const app = require("./api");
const assert = require("assert");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact page");
    });
  });

  describe("/hello", () => {
    it("should return the hello page when some inexistent page have requested", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "hello world");
    });
  });
  describe("/login", () => {
    it("should login successfully on the login route and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "cesar", password: "12345" })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login approved");
    });

    it("should return 401 when the user and password were passed through wrong", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "teste", password: "22" })
        .expect(401);

      assert.deepStrictEqual(response.text, "Login failed!");
    });
  });
});
