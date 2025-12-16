import request from "supertest";
import app from "../app";
describe("Auth - Login", () => {
  it("should fail login for non-registered user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "notregistered@example.com",
        password: "wrongpassword",
      });

    expect(res.status).toBe(401);
  });
});
