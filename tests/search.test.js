const request = require("supertest");
const app = require("../index");

const { user } = require("../models"); // import transaksi models

let authenticationToken = "0";

describe("Movie List TEST", () => {
  describe("/GET All Movie", () => {
    test("It should return list of all movies, with pagination", async () => {
      const res = await request(app).get("/movie/getAll?page=5&limit=10");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("/GET Featured Movie", () => {
    test("It should return 10 movies of featured movies", async () => {
      const res = await request(app).get("/movie/getFeatured");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("/GET Search Movie", () => {
    test("It should return list of movies that match the search options, with pagination", async () => {
      const res = await request(app).get("/movie/search?page=1&limit=10&genre=Action,adventure&title=Ave&release_date=2009,2021");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("/GET Search Movie (Not FOUND)", () => {
    test("It should return message not found", async () => {
      const res = await request(app).get("/movie/search?page=1&limit=10&genre=Action,comedy&title=ave&release_date=2059");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Not Found");
    });
  });

});

describe("Movie Details TEST", () => {
  describe("/GET Review Movie", () => {
    test("It should return list of review that connected to the movie", async () => {
      const res = await request(app).get("/movie/getReview/6079062a82fce60f2fede4cc?page=1&limit=10");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("/GET Movie Detail Info (NOT FOUND)", () => {
    test("It should return detail info of the movie", async () => {
      const res = await request(app).get("/movie/detail/60776b98c0ffba6cd2c3ebb8");

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("No movie Found");
    });
  });

  describe("/GET Movie Detail Info", () => {
    test("It should return detail info of the movie", async () => {
      const res = await request(app).get("/movie/detail/6079062a82fce60f2fede4cc");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("success");
      expect(res.body).toHaveProperty("data");
    });
  });

});
