const request = require("supertest");
const app = require("../index");

const { transaksi } = require("../models"); // import transaksi models
const { user } = require("../models"); // import transaksi models

let authenticationToken = "0";

describe("tes User", () => {
  describe("/POST Sign Up", () => {
    test("It should make user and get authentication_key (jwt)", async () => {
      await user.deleteMany();
      const res = await request(app).post("/auth/signup").send({
        name: "mas Reza",
        email: "fahmialfareza@icloud.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
        role: "admin",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("token");
    });
  });

  describe("/POST Login", () => {
    test("It should make user login and get authentication_key (jwt)", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "fahmialfareza@icloud.com",
        password: "Aneh1234!!",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("token");

    });
  });

  describe("/POST Sign Up Gagal Nama", () => {
    test("It should return status 400", async () => {
      const res = await request(app).post("/auth/signup").send({
        name: "mas Reza123",
        email: "fahmialfareza@icloud.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
        role: "admin",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Name must be alphabet");
    });
  });

  describe("/POST Sign Up Gagal Email", () => {
    test("It should return status 400", async () => {
      const res = await request(app).post("/auth/signup").send({
        name: "mas Reza",
        email: "fahmialfarezaicloud.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
        role: "admin",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Email tidak valid");
    });
  });

  describe("/POST Sign Up Gagal password kurang kuat", () => {
    test("It should return status 400", async () => {
      const res = await request(app).post("/auth/signup").send({
        name: "mas Reza",
        email: "fahmialfareza@icloud.com",
        password: "Aneh1234",
        confirmPassword: "Aneh1234",
        role: "admin",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("password must have minimum length 8, minimum 1 lowercase character, minimum 1 uppercase character, minimum 1 numbers, and minimum 1 symbols");
    });
  });

  describe("/POST Sign Up Gagal password tidak sama", () => {
    test("It should return status 401", async () => {
      const res = await request(app).post("/auth/signup").send({
        name: "mas Reza",
        email: "fahmialfareza@icloud.com",
        password: "Aneh1234!!",
        confirmPassword: "Ane234",
        role: "admin",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("password tidak sama");
    });
  });
});
